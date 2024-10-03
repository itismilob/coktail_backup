const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./db');
const config = require('./config');
const router = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

connectMongoDB(); // 몽고DB 연결

// 개발환경에서만 cors 사용
const isDevelopment = config.nodeEnv !== 'production ';

if (isDevelopment) {
  app.use(
    cors({
      // origin: config.frontendURI, // 출처 허용 옵션
      origin: '*',
      credentials: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
    }));
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//^ 백엔드 테스트시 아래 주석 해제
//app.use(express.static('public'));
//app.use('/images', express.static('images'));

app.use("/api", router);

//스웨거
const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler
app.use((err, req, res, next) => {
  const isMongooseError = err instanceof mongoose.Error; // 몽구스 에러
  const errorStatus = err.status || 500; // 에러 상태코드 설정
  const errorMessage = isMongooseError ? '서버 오류' : err.message; // 에러 메세지 설정

  console.log(`${errorMessage} :`, err.message); // 에러 로그
  res.status(errorStatus).json({ message: errorMessage }); // 에러 상태 응답
});

app
  .listen(config.port, () =>
    console.log(`
############################
#     Server is start!     #
############################`))
  .on("error", () => {
    console.error('error');
    process.exit(1);
  });