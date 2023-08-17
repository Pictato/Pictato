<!-- PROJECT LOGO -->
<h1 align>Pictato</h1>
<br/>
<div>
  <div align="center">
  <img width="180" alt="image" src="https://github.com/ella00100/android/assets/103167624/4458fa93-76c5-459e-a635-d082da2c8a77">

<!--Table of Content-->
<details>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#team-members">Team Members</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#aws-architecture">AWS Architecture</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</details>
<br/>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

https://github.com/Pictato/Pictato/assets/103167624/ec4a82d2-6391-4a6d-8c06-d85bcc3e79ab

Project Duration: July 31, 2023 - August 23, 2023

Pictato는 KEB Software Bootcamp에서 어노테이션 AI 기업과 연계하여 개발한 프로젝트입니다. 이 어플리케이션은 aws cloud 서비스를 이용한 서버리스 백엔드 기술을 활용하여 제작되었으며, 사용자들이 사진을 메모와 함께 업로드하여 감성적인 폴라로이드 사진으로 일상을 기록하고 친구들과 공유할 수 있는 플랫폼을 제공합니다.

## Key Feature

- **User Management:** AWS Cognito와 API Gateway를 활용하여 사용자 관리를 간단하게 처리합니다.
- **Picture Upload:** 사용자는 사진을 Amazon S3에 업로드하여 일상적인 순간을 기록할 수 있습니다.
- **Memo Addition:** 업로드한 사진에 메모를 추가하여 Amazon DynamoDB에 저장하고 더 많은 정보를 기록할 수 있습니다.
- **Social Sharing:** 사용자들은 기록한 사진과 메모를 친구들과 손쉽게 공유할 수 있습니다.
- **Montly Diary:** 기록된 사진들을 월별로 찾아볼 수 있습니다. 

<!-- Team -->
## Team Members
* Team Leader : 경기대학교 컴퓨터공학과 조성원
* Team Member : 성균관대학교 컴퓨터교육학과 정지윤
* Team Member : 인하대학교 경영학과 윤서영

<!-- Built with -->
## Built With
* <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=yellow"> 3.11.4
* <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"> 18.2.0
* <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 24.0.2
* <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"> 3.6.1
* <img src="https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=nodedotjs&logoColor=yellow"> 18.17.0
* <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
* <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<br/>

### AWS Services

* <img src="https://img.shields.io/badge/AWS Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white"> 
* <img src="https://img.shields.io/badge/AWS ApiGateWay-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white">
* <img src="https://img.shields.io/badge/AWS Cognito-DD344C?style=for-the-badge&logo=amazoniam&logoColor=white">
* <img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
* <img src="https://img.shields.io/badge/AWS DynamoDB-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white"> 


## AWS Architecture
![image](https://github.com/Pictato/Pictato/assets/103167624/87d71242-dca1-453e-bcb1-7284f5abd2f6)


<!-- USAGE -->
## Usage
1. Click this URL : [Pictato Link](https://pictato.vercel.app/)
2. Sign Up and Verify with your email


<!-- GETTING STARTED -->
## Getting Started

1. Clone the repo
   ```
   git clone https://github.com/Pictato/Pictato.git
   ```

2. move to app/cdk and Install NPM packages 
   ```sh
   npm install
   ```

3. move to app/cdk/lib/config/account.ts and insert your AWS account
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

4. Running Docker

5. move to app/cdk and check stack
   ```sh
   cdk ls
   ```

6. cdk deploy 
   ```sh
   cdk deploy --all
   ```

7. move to app/frontend/web and yarn install
   ```sh
   yarn install
   ```

8. Fix the URL in app/frontend/web/src/USERPOO, app/frontend/web/src/apis/galleryApi.js, pp/frontend/web/src/pages/Gallery.jsx , app/frontend/web/src/components/polaroid 
<br/>


13. running yarn
   ```sh
   yarn dev
   ```



<!-- LICENSE -->
## License


<!-- CONTACT -->
## Contact

SeongWon-Joe : [@wontory](https://github.com/wontory)
<br/>
JiYun-Jeong : [@Jiyun](https://github.com/j2yun)
<br/>
SeoYoung-Yun : [@Ella](https://github.com/ella00100)


Project Link : [https://github.com/Pictato/Pictato.git](https://github.com/Pictato/Pictato.git)






