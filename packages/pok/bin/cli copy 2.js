import cac from "cac";

// 1. 创建 CLI 实例
const cli = cac("my-cli");

// 2. 定义命令（支持异步）
cli.command("build", "构建项目").action(async () => {
  // 模拟异步操作
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 模拟错误（会被 catch 捕获）
  throw new Error("构建失败：缺少配置文件");
});

// 3. 执行封装
async function run() {
  try {
    // 解析参数（不立即执行）
    const parsed = cli.parse(process.argv, { run: false });

    // 手动执行匹配命令
    if (parsed.args.command) {
      await parsed.args.command.action(parsed.args);
    }
  } catch (error) {
    // 自定义错误处理
    console.error("🔥 错误:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 4. 启动执行
run();
