/**
 * Created by Administrator on 2015/10/9.
 */
function getStyle(obj,name)   //��ȡ���м���ʽ currentStyle����IE; getComputedStyle����FF,Chrome;
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
        var oStop = true;   //��ÿ��jsonѭ��֮ǰ��������ֵ������Ŀ���
        for(var item in json)
        {
            var cur = 0;
            if(item=='opacity')
            {
                cur = Math.round(parseFloat(getStyle(obj,item))*100);  //��������ȥ��С����
            }
            else
            {
                cur= parseInt(getStyle(obj,item));
            }
            var speed = (json[item]-cur)/70;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);

            if(json[item]!=cur)   // �ж�jsonѭ��ʱ�����ֵû�ﵽĿ��㣬��ֹͣ��ʱ��
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
