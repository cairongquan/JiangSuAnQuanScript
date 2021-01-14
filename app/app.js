const express = require('express');
const app = express();

const request = require('request');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //允许的请求的url地址 *代表所有地址
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); //允许客户端的请求方式
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Token"); //请求头请求允许字段
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


let cookieStr = 'ASP.NET_SessionId=uub3e4w5t1jx4wc4tz2vvt3a; userPwd=-1; userName=; schoolId=; auth=010294F6DA5293B8D808FE94B6447D5CB9D808011675006E0069003800610077006F00730066006A006A006F00670062006B0074003000690067006F006E00610000012F00FFAB20A55235883DDF1EEF9F8D84F62495F0C64301';




app.post("/", (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://aq.fhmooc.com/api/portal/CellManager/getVideoList',
        'headers': {
            'Cookie':  cookieStr
        }
    };
    let j = request.jar();
    let url = 'https://aq.fhmooc.com/api/portal/CellManager/getVideoList';

    request.defaults({ jar: true });
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
})


app.post('/GetId', (req, res) => {
    let data = req.body;
    var options = {
        'method': 'POST',
        'url': 'https://aq.fhmooc.com/api/design/LearnCourse/statStuProcessCellLogAndTimeLong',
        'headers': {
            'Cookie':  cookieStr
        },
        "form": data
    };
    let j = request.jar();

    request.defaults({ jar: true });
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.post('/getAn', (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://aq.fhmooc.com/api/manager/PaperStudent/getPaperStudentInfo',
        'headers': {
            'Cookie':  cookieStr
        },
        "form": { paperStuId: "aisiaask69gixzityhppw" }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
    

})


// 创建考试接口 https://aq.fhmooc.com/api/design/PaperStudent/getStuPaper?courseId=qkcfawcsxyrom0zrwghhwq post courseId=qkcfawcsxyrom0zrwghhwq

// 提交考题答案接口 https://aq.fhmooc.com/api/design/PaperStudent/saveStuQuesAnswer post paperStuld:创建考试id paperId:考卷id quesId:题目id
// answerJson {"quesId":"","answer":2} //答案 quesId题目Id answer答案

// 提交试卷接口 https://aq.fhmooc.com/api/design/PaperStudent/submitStuPaper paperStuId 创建考试Id paperId:考卷Id

app.post('/creatAn', (req, res) => { //创建考试
    var options = {
        'method': 'POST',
        'url': 'https://aq.fhmooc.com/api/design/PaperStudent/getStuPaper',
        'headers': {
            'Cookie':  cookieStr
        },
        "form": { courseId: "qkcfawcsxyrom0zrwghhwq" }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.post('/pickAn', (req, res) => {
    console.log(req.body.quesId);
    var options = {
        'method': 'POST',
        'url': 'https://aq.fhmooc.com/api/design/PaperStudent/saveStuQuesAnswer',
        'headers': {
            'Cookie': cookieStr,
            'Content-Type': "application/x-www-form-urlencoded"
        },
        "form": {
            paperStuId: req.body.paperStuId,
            paperId: req.body.paperId,
            quesId: req.body.quesId,
            answerJson:JSON.stringify(req.body.answerJson) 
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.post('/sumit', (req, res) => {
    var options = {
        'method': 'POST',
        'url': 'https://aq.fhmooc.com/api/design/PaperStudent/submitStuPaper',
        'headers': {
            'Cookie':  cookieStr
        },
        "form": {
            paperStuId: req.body.paperStuId,
            paperId: req.body.paperId
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.listen(3000, () => {
    console.log('服务器开启成功');
});