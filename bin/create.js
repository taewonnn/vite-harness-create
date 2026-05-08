#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import chalk from 'chalk';
import { createProject } from '../utils/projectCreator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(chalk.red('프로젝트명을 입력해주세요.'));
    console.log(chalk.gray('사용법: npm create harness-package@latest <project-name>'));
    process.exit(1);
  }

  const projectName = args[0];
  const projectPath = path.resolve(projectName);

  // 디렉토리 이미 존재하는지 확인
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`❌ 디렉토리가 이미 존재합니다: ${projectName}`));
    process.exit(1);
  }

  console.log(chalk.cyan('\n🚀 Harness Package 프로젝트 생성\n'));

  const questions = [
    {
      type: 'select',
      name: 'framework',
      message: '프레임워크를 선택하세요',
      choices: [
        { title: 'React + Vite', value: 'react' },
        { title: 'Next.js', value: 'next' }
      ],
      initial: 0
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'TypeScript를 사용하시겠습니까?',
      initial: true
    },
    {
      type: 'select',
      name: 'styling',
      message: '스타일링을 선택하세요',
      choices: [
        { title: 'Tailwind CSS', value: 'tailwind' },
        { title: 'CSS Modules', value: 'cssModules' },
        { title: 'None', value: 'none' }
      ],
      initial: 0
    }
  ];

  try {
    const options = await prompts(questions);

    if (!options.framework) {
      console.log(chalk.yellow('❌ 취소되었습니다.'));
      process.exit(0);
    }

    console.log(chalk.blue(`\n📦 프로젝트 생성 중...\n`));

    await createProject(projectName, projectPath, options);

    console.log(chalk.green(`\n✅ 프로젝트가 생성되었습니다!\n`));
    console.log(chalk.cyan(`다음 명령어를 실행하세요:\n`));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  npm install`));
    console.log(chalk.white(`  npm run dev\n`));

  } catch (error) {
    console.error(chalk.red('❌ 오류 발생:'), error.message);
    process.exit(1);
  }
}

main();
