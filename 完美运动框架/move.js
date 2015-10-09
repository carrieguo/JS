/**
 * Created by Administrator on 2015/10/9.
 */
function getStyle(obj,name)   //获取非行间样式 currentStyle兼容IE; getComputedStyle兼容FF,Chrome;
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];

    }
    else
    {
        //document.title=getComputedStyle(obj, false)[name];
        return getComputedStyle(obj, false)[name];
    }
}

function startMove(obj,json,fnEnd)
{
    //document.title=cur;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var oStop = true;   //在每次json循环之前假设所有值都到达目标点
        for(var item in json)
        {
            var cur = 0;
            if(item=='opacity')
            {
                cur = Math.round(parseFloat(getStyle(obj,item))*100);  //四舍五入去掉小数。
            }
            else
            {
                cur= parseInt(getStyle(obj,item));
            }
            var speed = (json[item]-cur)/70;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);

            if(json[item]!=cur)   // 判断json循环时如果有值没达到目标点，不停止定时器
            {
                oStop = false;
            }

            if(item=='opacity')
            {
                obj.style.filter = "alpha(opacity:"+cur+speed+")";
                obj.style.opacity = (cur+speed)/100;
            }
            else
            {
                obj.style[item]= cur+speed+'px';
            }


            document.title=json[item]+"+"+cur;
        }

        if(oStop==true)
        {
            clearInterval(obj.timer);
            if(fnEnd)
            {
                fnEnd();
            }
        }
    },30);
}/**
 * Created by Administrator on 2015/10/7.
 */
