

pipeline {
    agent any

    tools {
        nodejs 'Nodejs 22.14.0' // Sesuai nama yang kamu set di konfigurasi
    }

    environment {
        VITE_URL_API='https://chudai.fun/api'
        VITE_URL_STATIC='https://chudai.fun/static'
        PROJECT_DIR = '/var/lib/jenkins/workspace/bkp-dash'
        DEPLOY_DIR = '/var/www/bkp-dash'
    }

    stages {
        // stage('Clone Repo') {
        //     steps {
        //         // Jika Jenkins pakai "Pipeline script from SCM", tahap ini bisa dilewati
        //         git url: 'https://github.com/kamu/repo-react-vite.git', branch: 'main'
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                dir("${env.PROJECT_DIR}") {
                    sh 'npm install'
                }
            }
        }

        // stage('Build') {
        //     steps {
        //         dir("${env.PROJECT_DIR}") {
        //             sh 'npm run build'
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         script {
        //             sh """
        //                 sudo cp -r ${PROJECT_DIR}/dist/* ${DEPLOY_DIR}/dist/
        //             """
        //         }
        //     }
        // }
    }
}

