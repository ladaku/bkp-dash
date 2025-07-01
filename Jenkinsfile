pipeline {
    agent any

    tools {
        nodejs 'Nodejs 22.14.0' // Sesuai nama yang kamu set di konfigurasi
    }
    
    environment {
        NODE_ENV = 'production'
        VITE_URL_API = 'https://chudai.fun/api'
        VITE_URL_STATIC='https://chudai.fun/static'
    }

    stages {
        stage('Masuk ke Folder Project') {
            steps {
                dir('/var/www/hayo') {
                    script {
                        echo "📁 Masuk ke /var/www/hayo"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('/var/www/hayo') {
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('/var/www/hayo') {
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: '/var/www/hayo/dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "✅ Build berhasil!"
        }
        failure {
            echo "❌ Build gagal!"
        }
    }
}
