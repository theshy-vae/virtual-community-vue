import dayjs from "dayjs";

export function getTime(time) {
        var new_date = new Date(); //新建一个日期对象，默认现在的时间
        var old_date = new Date(`${time}`); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

        var difftime = (new_date - old_date)/1000; //计算时间差,并把毫秒转换成秒
        var result=""
        var a=JSON.stringify(old_date).slice(1,5)
        var b=JSON.stringify(new_date).slice(1,5)
        if(difftime <60) {
            var a=JSON.stringify(difftime).slice(0,2)
            if(a.slice(0,1)==='-') result=a.slice(1)+'秒前'
                else if(a.slice(1)==='.') result=a.slice(0,1)+'秒前'
            else result=a.slice(0,2)+'秒前'
        }
        else if(difftime < 60*60){
            result=difftime/60
            var a=JSON.stringify(result).slice(0,2)
            if(a.slice(1)!='.') result=a+'分钟前'
            else result=a.slice(0,1)+'分钟前'
        }
        else if(difftime < 60*60*24){
            result=difftime/60/60
            var a=JSON.stringify(result).slice(0,2)
            if(a.slice(1)!='.') result=a+'小时前'
            else result=a.slice(0,1)+'小时前'
        }
        else if(difftime < 60*60*24*5){
            result=difftime/60/60/24
            var a=JSON.stringify(result).slice(0,2)
            if(a.slice(1)!='.') result=a+'天前'
            else result=a.slice(0,1)+'天前'
        }
        else if(difftime > 60*60*24*5&&a===b) result=dayjs(old_date).format('MM-DD')
        else result=dayjs(old_date).format('YYYY-MM-DD')
        return  result
}