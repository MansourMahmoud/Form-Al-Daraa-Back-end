const express = require("express");
var cors = require("cors");

const nodemailer = require("nodemailer");

const app = express();
app.use(cors());

//middleware for parsing JSON in request body
app.use(express.json());

const { ERROR } = require("./utils/httpStatusText");

app.post("/send", (request, response) => {
  const {
    fullName,
    phone,
    email,
    screenProtector,
    flatScreensProducts,
    flatScreensnumberOfProducts,
    curvedScreensProducts,
    curvedScreensNumberOfProducts,
    region,
    city,
    locationDetails,
  } = request.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mansourmahmoud9999@gmail.com",
      pass: "twgzuhqfivzgtkqv",
    },
  });

  let screenProducts = null;

  if (screenProtector === "واقيات شاشات مسطحة") {
    screenProducts = {
      type: flatScreensProducts,
      num: flatScreensnumberOfProducts,
    };
  } else if (screenProtector === "واقيات شاشات منحنية") {
    screenProducts = {
      type: curvedScreensProducts,
      num: curvedScreensNumberOfProducts,
    };
  }

  const mail_option = {
    from: request.body.email || "aldr3alwaqy4@gmail.com",
    to: "aldr3alwaqy4@gmail.com",
    subject: "عرض اسعار",
    text: "الدرع الواقي",
    html: `
      <div  dir="rtl">

      <div style="text-align: center;">
            <span style="font-size: 22px; color: black;"> نموذج عرض الأسعار للدرع الواقي</span>
           </div>

          <div style="display: flex; gap: 10px;">
            <span style="font-size: 22px; color: black;"> الإسم :- </span>
            <span style="font-size: 22px; color: green; font-weight: 600;">${fullName}</span>
           </div>

          <div style="display: flex; gap: 10px;">
            <span style="font-size: 22px; color: black;"> رقم الجوال :- </span>
            <span style="font-size: 22px; color: green; font-weight: 600;">${phone}</span>
          </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> الإيميل  :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${email}</span>
        </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> نوع حامي الشاشات الذي اختاره المستخدم هو :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${screenProtector}</span>
        </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> اختار المستخدم من منتجات واقيات الشاشات المسطحة :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${screenProducts?.type}</span>
        </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> وعددها :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${screenProducts?.num}</span>
        </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> المنطقة :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${region}</span>
        </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> المدينة :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${city}</span>
        </div>

        <div style="display: flex; gap: 10px;">
          <span style="font-size: 22px; color: black;"> تفاصيل العنوان (اللوكيشن) :- </span>
          <span style="font-size: 22px; color: green; font-weight: 600;">${locationDetails}</span>
        </div>

      </div>
      `,
  };

  transporter.sendMail(mail_option, (error, info) => {
    if (error) {
      return response
        .status(400)
        .json({ message: "فشل ارسال الرسالة.. رجاء حاول مرة أخري" });
    } else {
      console.log("Email sent:", info);
      // Send a success response or redirect the client
      return response.status(200).json({
        success: true,
        message:
          "تم ارسال رسالتك بنجاح. سيتم الرد عليك في اقرب وقت ممكن. شكرا لك!",
      });
      // response.redirect("/success");
    }
  });
});

app.get("/success", (request, response) => {
  response.send(
    "<h1>تم ارسال رسالتك بنجاح. سيتم الرد عليك في اقرب وقت ممكن. شكرا لك!</h1>"
  );
});

// global middleware for not found router
app.all("*", (req, res) => {
  return res
    .status(404)
    .json({ status: ERROR, message: "this resource is not available" });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.code || 400).json({
    status: error.statusText || ERROR,
    message: error.message,
    code: error.code || 400,
  });
});

//start server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
