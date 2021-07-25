1. CI 设置中的一些常见步骤包括 linting, testing, 以及 building。在你选择的语言的生态系统中，有哪些具体工具来处理这些步骤？

   linting: eslint
   testing: jest cypress
   building: rollup webpack

2. 除了 Jenkins 和 GitHub Actions 之外，还有什么其他方法可以设置 CI? 同样，你可以问 google！
   GitLab CI
   Travis CI

3. 在自主托管环境或基于云的环境中，这种设置会更好吗？为什么？你需要什么信息来做出这个决定？
   根据项目需求，与业务需求
   项目需求: 云环境是否可以满足构建的需要
   业务需求: 业务环境可能是离线的环境则需要部署自主托管
