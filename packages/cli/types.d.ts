
declare module "@xixi-cli/create" {
  // 你的模块类型声明
}

// 使用 import type 来导入类型
import type { SomeType } from "@xixi-cli/create";

// 或者使用 typeof import() 来获取模块的类型
type ModuleType = typeof import("@xixi-cli/create");