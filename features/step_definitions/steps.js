const { defineSupportCode } = require('cucumber')

defineSupportCode(function ({ Given, When, Then }) {
  Given('the file {stringInDoubleQuotes} contains:', function (filePath, contents) {
    return this.writeFile(filePath, contents)
  })

  Given('a step definition includes the lines:', function (lines) {
    const contents = [
      'const { defineSupportCode } = require(\'cucumber\')',
      'defineSupportCode(function ({ When }) {',
      '  When(\'I run that step\', function() {'
    ]
    .concat(lines.split('\n').map(line => '    ' + line))
    .concat([
      '  })',
      '})'
    ]).join('\n')
    return this.writeFile('features/step_definitions/steps.js', contents)
  })

  When('I run a scenario with that step', function () {
    const contents = [
      'Feature: With that step',
      '  Scenario: Running that step',
      '    When I run that step'
    ].join('\n')
    return this.writeFile('features/with_that_step.feature', contents)
      .then(() => {
        return this.runCommand('cucumber-electron features/with_that_step.feature')
      })
  })

  When('I run `{command}`', function (command) {
    return this.runCommand(command)
  })

  Then('the process should exit with code {int}', function (exitCode) {
    return this.assertProcessExitedWithCode(exitCode)
  })

  Then('the process should not exit', function () {
    return this.assertProcessDidNotExit()
  })

  Then('the output should include:', function (expectedOutput) {
    return this.assertOutputIncludes(expectedOutput)
  })

  Then('stdout should include {stringInDoubleQuotes}', function (expectedOutput) {
    return this.assertStdoutIncludes(expectedOutput)
  })

  Then('stderr should include {stringInDoubleQuotes}', function (expectedOutput) {
    return this.assertStderrIncludes(expectedOutput)
  })
})
