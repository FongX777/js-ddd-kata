const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/test-report.json', // JSON 格式的測試結果檔路徑
  output: 'reports/test-report.html', // HTML 報告輸出位置
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    // 顯示在報告上的附屬資訊
    'Test Environment': 'DEVELOPMENT',
  },
};
reporter.generate(options);
