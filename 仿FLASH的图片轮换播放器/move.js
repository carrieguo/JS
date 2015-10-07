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
function startMove(obj,item,iTarget)
{

    //document.title=cur;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var cur = 0;
        if(item=='opacity')
        {
            cur = Math.round(parseFloat(getStyle(obj,item))*100);  //四舍五入去掉小数。
        }
        else
        {
            cur= parseInt(getStyle(obj,item));
        }
        var speed = (iTarget-cur)/8;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        if(iTarget==cur)
        {
            clearInterval(obj.timer);
        }
        else
        {
            if(item=='opacity')
            {
                obj.style.filter = "alpha(opacity:"+cur+speed+")";
                obj.style.opacity = (cur+speed)/100;
            }
            else
            {
                obj.style[item]= cur+speed+'px';
            }
        }
        document.title=iTarget+"+"+cur;
    },30);
}/**
 * Created by Administrator on 2015/10/7.
 */
