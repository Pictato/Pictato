<div align="center">
  
![Pictato](https://avatars.githubusercontent.com/u/140679134?s=400&u=606810ca49ec0b0d607e2dfa90ce9eaf4bc26051&v=4)

# Pictato

<details>
  <summary><strong>&nbsp;Table of Contents</strong></summary>

&nbsp;  
[About The Project](#about-the-project)<br/>
[Team Members](#team-members)<br/>
[Built With](#built-with)<br/>
[AWS Architecture](#aws-architecture)<br/>
[Usage](#usage)<br/>
[Getting Started](#getting-started)<br/>
[Contact](#contact)<br/>
</details>

</div>

&nbsp;

<!-- ABOUT THE PROJECT -->
## About The Project
https://github.com/Pictato/Pictato/assets/103167624/ec4a82d2-6391-4a6d-8c06-d85bcc3e79ab

Project Duration: July 31, 2023 - August 23, 2023

Pictato는 KEB Software Bootcamp에서 어노테이션 AI 기업과 연계하여 개발한 프로젝트입니다. 이 어플리케이션은 AWS Cloud 서비스를 이용한 서버리스 백엔드 기술을 활용하여 제작되었으며, 사용자들이 사진을 메모와 함께 업로드하여 감성적인 폴라로이드 사진으로 일상을 기록하고 친구들과 공유할 수 있는 플랫폼을 제공합니다.

&nbsp;

### Key Feature
- **User Management:** AWS Cognito와 API Gateway를 활용하여 사용자 관리를 간단하게 처리합니다.
- **Picture Upload:** 사용자는 사진을 Amazon S3에 업로드하여 일상적인 순간을 기록할 수 있습니다.
- **Memo Addition:** 업로드한 사진에 메모를 추가하여 Amazon DynamoDB에 저장하고 더 많은 정보를 기록할 수 있습니다.
- **Social Sharing:** 사용자들은 기록한 사진과 메모를 친구들과 손쉽게 공유할 수 있습니다.
- **Montly Diary:** 기록된 사진들을 월별로 찾아볼 수 있습니다. 

&nbsp;

<!-- Team -->
## Team Members
* **Team Leader:** 경기대학교 컴퓨터공학과 조성원
* **Team Member:** 성균관대학교 컴퓨터교육학과 정지윤
* **Team Member:** 인하대학교 경영학과 윤서영

&nbsp;

<!-- Built with -->
## Built With
![Python](https://img.shields.io/badge/Python-3.11.4-3776AB?style=for-the-badge&logo=python&logoColor=yellow)  
![React.js](https://img.shields.io/badge/React-18.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Docker](https://img.shields.io/badge/Docker-24.0.2-2496ED?style=for-the-badge&logo=docker&logoColor=white)  
![Yarn](https://img.shields.io/badge/Yarn-3.6.1-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)  
![Node.js](https://img.shields.io/badge/NodeJS-18.17.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=yellow)  
![TypeScript](https://img.shields.io/badge/TypeScript-CDK-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  
![Vercel](https://img.shields.io/badge/vercel-deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)  

&nbsp;

### AWS Services
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)  
![AWS API Gateway](https://img.shields.io/badge/AWS%20ApiGateWay-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white)  
![AWS Cognito](https://img.shields.io/badge/AWS%20Cognito-DD344C?style=for-the-badge&logo=amazoniam&logoColor=white)  
![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)  
![AWS DynamoDB](https://img.shields.io/badge/AWS%20DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)  

&nbsp;

## AWS Architecture
![image](https://github.com/Pictato/Pictato/assets/103167624/87d71242-dca1-453e-bcb1-7284f5abd2f6)

&nbsp;

<!-- USAGE -->
## Usage
1. Click this link : [Pictato](https://pictato.vercel.app/)
2. Sign up and verify with your email

&nbsp;

<!-- GETTING STARTED -->
## Getting Started
1. Clone the repo
   ```
   git clone https://github.com/Pictato/Pictato.git
   ```
2. Move to app/cdk and install NPM packages 
   ```sh
   npm install
   ```
3. Move to app/cdk/lib/config/account.ts and insert your AWS account
   ```ts
   export const Accounts: Account[] = [
     {
       accountId: "your AWS account ID ",
       stage: "your stage",
       region: "whar you want that aws region : ex. 서울(ap-northeast-2)",
       airportCode: "what you want that airportcode : ex. 인천공항(ICN)",
     },
   ];
   ```
4. Run Docker
5. Move to app/cdk and check stack
   ```sh
   cdk ls
   ```
6. Deploy CDK 
   ```sh
   cdk deploy --all
   ```
7. Move to app/frontend/web and yarn install
   ```sh
   yarn install
   ```
8. Fix the URL in app/frontend/web/.env
9. Run local server
   ```sh
   yarn dev
   ```

&nbsp;

<!-- CONTACT -->
## Contact
Seongwon Jo : [@wontory](https://github.com/wontory)

Jiyun Jeong : [@Jiyun](https://github.com/j2yun)

Seoyoung Yun : [@Ella](https://github.com/ella00100)

&nbsp;

## Acknowledgement
```
"본 연구는 과학기술정보통신부 및 정보통신기획평가원의 SW전문인재양성사업의 연구결과로 수행되었음"(2022-0-01127)
```

&nbsp;  

Project Link : [https://github.com/Pictato/Pictato.git](https://github.com/Pictato/Pictato.git)
