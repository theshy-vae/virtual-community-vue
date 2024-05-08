class Barrage{
    constructor(canvas,canvasWidth,canvasHeight,highwayAmount,fontSize) {
        //获取canvas对象
        this.canvas=document.getElementById(canvas);
        //获得2d上下文对象
        this.context=this.canvas.getContext("2d")
        //获取canvas高和宽
        this.canvasHeight=canvasHeight
        this.canvasWidth=canvasWidth

        this.canvas.width=this.canvasWidth
        this.canvas.height=this.canvasHeight
        //存储正在发送的弹幕
        this.barrageList=[]
        //存储待发送的弹幕
        this.textListText=[]
        //存储待发送的弹幕颜色
        this.textListColor=[]
        //获得字体大小
        this.fontSize=fontSize
        this.context.font=`${this.fontSize}px STheiti,SimHei`
        this.highwayAmount=[]
        this.initTop(highwayAmount)
        //是否完成绘画标志
        this.draw=false
        //是否继续绘画标志
        this.clickStop=true
    }
    initTop(highwayAmount){
        //规定最大轨道数
        const maxHighwayAmount=parseInt(this.canvasHeight/(this.fontSize+20))
        maxHighwayAmount<highwayAmount?highwayAmount=maxHighwayAmount:""
        for(let i=1;i<highwayAmount;i++){
            this.highwayAmount.push(((this.fontSize+20)*i))
        }
    }
    initTest(text,color){
        //初始化弹幕信息
        let value=text
        let barrageTest={
            value,
            top:this.highwayAmount.splice(0,1)[0],
            left:this.canvasWidth,//弹幕起点
            color:color,
            offset:Math.ceil(Math.random()*3),//弹幕速度
            width:Math.ceil(this.context.measureText(value).width),
            occupation:true
        }
        return barrageTest
    }
    addTest(text,color){
        if(this.draw){
            //有轨道数，插入弹幕
            if(this.highwayAmount.length!==0){
                this.barrageList.push(this.initTest(text,color))
            }else{
                //无轨道数，插入等待队列
                this.textListText.push(text)
                this.textListColor.push(color)
            }
        }else{
            this.textListText.push(text)
            this.textListColor.push(color)
            this.draw=true
            this.runBarrage()
        }
    }
    runBarrage(){
        this.textListText.splice(0,this.highwayAmount.length).forEach((val)=>{
            var color=this.textListColor.splice(0,1)
            this.barrageList.push(this.initTest(val,color))
        })
        this.drawBarrage()
    }
    drawBarrage(){
        //清空canvas画布
        this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight)
        for(let i=0;i<this.barrageList.length;i++){
            this.barrageList[i].left+this.barrageList[i].width<=0?
                this.barrageList.splice(i,1):''
        }
        this.barrageList.forEach((val)=>{
            this.context.fillStyle=val.color//设置弹幕颜色
            this.context.fillText(`${val.value}`,val.left,val.top)
            val.occupation&&val.left+val.width<=this.
                canvasWidth?this.consumeTest(val):''
            val.left-=2
        })
        if(this.clickStop)
            this.barrageList.length===0?this.draw=false:
                requestAnimationFrame(this.drawBarrage.bind(this))
        


    }
    consumeTest(val){
        //表示已经飘出屏幕
        val.occupation=false
        setTimeout(()=>{
            //返还自己占用的轨道
            this.highwayAmount.push(val.top)
            if(this.textListText.length!==0){
                this.barrageList.push(this.initTest(this.textListText.splice(0,1)[0],this.textListColor.splice(0,1)[0]))
            }
        },500)
    }
}

export default {
    Barrage
}