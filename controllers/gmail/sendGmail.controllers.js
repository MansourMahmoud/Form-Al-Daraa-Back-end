const asyncWrapper = require("../../middleware/asyncWrapper");
const nodemailer = require("nodemailer");

const sendGmail = asyncWrapper(async (request, response, next) => {
  const {
    fullName,
    phone,
    email,
    screenProtector,
    flatScreensProducts,
    curvedScreensProducts,
    region,
    city,
    locationDetails,
  } = request.body;
  console.log("request.body : ", request.body);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mansourmahmoud9999@gmail.com",
      pass: "twgzuhqfivzgtkqv",
    },
  });

  let screenProducts = null;

  if (screenProtector === "واقيات شاشات مسطحة") {
    screenProducts = flatScreensProducts;
  } else if (screenProtector === "واقيات شاشات منحنية") {
    screenProducts = curvedScreensProducts;
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
              <span style="font-size: 22px; color: black;"> نوع حامي الشاشات الذي اختاره المستخدم :-  </span>
              <span style="font-size: 22px; color: green; font-weight: 600;">${screenProtector}</span>
            </div>
    
            <div style="display: flex; gap: 10px;">
              <span style="font-size: 22px; color: black;"> اختار المستخدم من منتجات ${screenProtector} :- </span>
            </div>
            <div style="overflow-x: auto;">
              <table style="border-collapse: collapse; width: 100%; font-size: 18px;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">المنتج</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">العدد</th>
                  </tr>
                </thead>
                <tbody>
                  ${screenProducts
                    .map(
                      (product) => `
                    <tr>
                      <td style="border: 1px solid #ddd; padding: 8px;">${product.productName}</td>
                      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${product.num}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
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

module.exports = {
  sendGmail,
};
