window.dom = {
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();//trim 是去掉字符串前后空格的
        return container.content.firstChild;
      },
    //增 弟弟
    after(node, node2){
      node.parentNode.insertBefore(node2,node.nextSibling)
    },
    //增 哥哥
    before(node, node2){
      node.parentNode.insertBefore(node2,node)
    },
    //增 儿子
    append(parent, node){
      parent.appendChild(node)
    },
    //增 爸爸
    wrap(node, parent){
      dom.before(node, parent)
      dom.append(parent, node)
    },
    //删 节点
    remove(node){
      node.parentNode.removeChild(node)
      return node
    },
    //删 后代
    empty(node){
      const array = []
      let x = node.firstChild
      while(x){
        array.push(dom.remove(node.firstChild))
        x = node.firstChild
      }
      return array
    }, 
    //改 属性
    attr(node, name, value){ //重载
      if(arguments.length===3){
        node.setAttribute(name, value)
      }else if(arguments.length===2){
        return node.getAttribute(name)
      }
    },
    //改 文本内容
    text(node, string){ // 适配
      if(arguments.length ===2 ){
        if('innerText' in node){
          node.innerText = string 
        }else{
          node.textContent = string 
        }
      }else if(arguments.length === 1){
        if('innerText' in node){
          return node.innerText
        }else{
          return node.textContent
        }
      }
    },
    //改 HTML内容
    html(node,string){
      if(arguments===2){
        node.innerHTML = string
      }else if(arguments===1){
        return node.innerHTML
      }
    },
    //改 style
    style(node, name, value){
      if(arguments.length===3){
        // dom.style(div, 'color', 'red')
        node.style[name] = value
      }else if(arguments.length===2){
        if(typeof name === 'string'){
          // dom.style(div, 'color')
          return node.style[name]
        }else if(name instanceof Object){
          // dom.style(div, {color: 'red'})
          const object = name
          for(let key in object){
            node.style[key] = object[key]
          }
        }
      }
    },
    //改 添加/删除 class
    class:{
      add(node, className){
        node.classList.add(className)
      },
      remove(node, className){
        node.classList.remove(className)
      },
      has(node, className){
        return node.classList.contains(className)
      }
    },
    //改 添加 事件监听
    on(node, eventName, fn){
      node.addEventListener(eventName, fn)
    },
    //改 删除 事件监听
    off(node, eventName, fn){
      node.removeEventListener(eventName, fn)
    },

    //查
    find(selector, scope){
      return (scope || document).querySelectorAll(selector)
    },
    parent(node){
      return node.parentNode
    },
    children(node){
      return node.children
    },
    siblings(node){
      return Array.from(node.parentNode.children)
      .filter(n=>n!==node)
    },
    next(node){
      let x = node.nextSibling
      while(x && x.nodeType === 3){
        x = x.nextSibling
      }
      return x
    },
    previous(node){
      let x = node.previousSibling
      while(x && x.nodeType === 3){
        x = x.previousSibling
      }
      return x
    },
    each(nodeList, fn){
      for(let i=0;i<nodeList.length;i++){
        fn.call(null, nodeList[i])
      }
    },
    index(node){
      const list = dom.children(node.parentNode)
      let i
      for(i=0;i<list.length;i++){
        if(list[i] === node){
          break
        }
      }
      return i
    }  
};