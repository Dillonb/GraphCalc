function updateScreenSize(xmin, xmax, ymin, ymax)
{
    window.xmin = xmin;
    window.xmax = xmax;
    window.ymin = ymin;
    window.ymax = ymax;
    c = getCanvas();

    window.scalex = c.width / (Math.abs(xmin) + Math.abs(xmax));
    window.scaley = c.height / (Math.abs(ymin) + Math.abs(ymax));

}
function getCanvas()
{
    if (window.c == null)
    {
        window.c = document.getElementById("graphPanel");
    }
    return c;
}
function mathToComp(x,y)
{
    compPoints = [0,0]

    //Translate to an all-positive system

    if (x > 0)
    {
        compPoints[0] = x + Math.abs(xmin);
    }
    else
    {
        compPoints[0] = x - xmin;
    }
    if (y > 0)
    {
        compPoints[1] = y + Math.abs(ymin);
    }
    else
    {
        compPoints[1] = y + ymax;
    }

    //Flip the y axis upside down
    compPoints[1] = ymax - ymin - compPoints[1];

    //Scale to the screen size
    compPoints[0] *= scalex;
    compPoints[1] *= scaley;

//    console.log("[" + x + "," + y + "], " + compPoints);
    return compPoints;
}
function graphDrawLineWithTwoArrays(start,end)
{
    ctx = getCanvas().getContext("2d");
    ctx.beginPath();
    ctx.moveTo(start[0],start[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.stroke();
}
function drawAxes()
{
    //X axis
    xstart = mathToComp(xmin,0);
    xend = mathToComp(xmax,0);

    //Y axis
    ystart = mathToComp(0,ymin);
    yend = mathToComp(0,ymax);

    graphDrawLineWithTwoArrays(xstart,xend);
    graphDrawLineWithTwoArrays(ystart,yend);

}
function clearGraph()
{
    c = getCanvas();
    ctx = c.getContext("2d");
//    ctx.fillStyle = "red";
    ctx.clearRect(0, 0, c.width, c.height);
    drawAxes();
}
function draw()
{
    updateScreenSize(-10,10,-10,10);
    c = getCanvas();

    clearGraph();
    if (window.yequals == null)
    {
        window.yequals = document.getElementById("equation");
    }

    drawAxes();

    //Y= equations
    prevY = null;
    xdiff = (Math.abs(xmin) + Math.abs(xmax)) / c.width;
    for (var x = xmin; x <= xmax; x += xdiff)
    {
        eval("newY = " + yequals.value);
        if (prevY != null)
        {
            graphDrawLineWithTwoArrays(mathToComp(x-xdiff, prevY), mathToComp(x,newY));

        }
        prevY = newY;
    }
}