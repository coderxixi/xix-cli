
import XIButton from "./component/button";


// 导出单独组件
export { XIButton };

// 编写一个插件，实现一个install方法

export default {
  install(app){
    app.component(XIButton.name, XIButton);
   
  },

};
