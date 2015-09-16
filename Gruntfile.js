
module.exports = function(grunt) {
  // constants and settings
  grunt.option('branch', 'default');

  grunt.option('commandline-options', {
    stdout: true,
    stderr: true,
    failOnError: true
  });

  // auto-loading
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*'],
    config: 'package.json',
    scope: ['devDependencies', 'dependencies']
  });
  require('time-grunt')(grunt);
// grunt-newer
// grunt-notify

  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        interrupt: true,
        livereload: true
      }
    },

    shell: {
      install: {
        command: 'sh dev/install-remote.sh '+ grunt.option('package'),
        options: grunt.option('commandline-options')
      },

      install_vm: {
        command: 'sh dev/install-vm.sh '+ grunt.option('package'),
        options: grunt.option('commandline-options')
      },

      install_csvm: {
        command: 'sh dev/install-csvm.sh '+ grunt.option('package'),
        options: grunt.option('commandline-options')
      }
    },

    todo: {
      options: {
        marks: [
          {
            name: "FIX",
            pattern: /FIXME/,
            color: "red"
          },
          {
            name: "TODO",
            pattern: /TODO/,
            color: "yellow"
          },
          {
            name: "NOTE",
            pattern: /NOTE/,
            color: "blue"
          }
        ],
        file: "refactor-report.md"
      },
      src: [
        'src/ION/**/*', 'assets/**/*', 'templates/**/*'
      ]
    }
  });

  grunt.registerTask('development', '', [
      'clean:build',
      'sudo_subcomponents:build',
      'jade:components',
      'jade:index',
      'less:compile',
      'uglify:vendor',
      'uglify:app',
      'uglify:templates',
      'copy:fonts',
      'copy:img',
      'copy:index'
  ]);

  grunt.registerTask('build', '', [
      'clean:build',
      'sudo_subcomponents:build',
      'jade:components',
      'jade:index',
      'less:compile',
      'uglify:vendor',
      'uglify:app',
      'uglify:templates',
      'copy:fonts',
      'copy:img',
      'copy:index'
  ]);

  grunt.registerTask('deploy', '', [
  ]);

  grunt.loadTasks(grunt.config('pkg.project.directories.build-tasks'));
};
