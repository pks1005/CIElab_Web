function get_content(){var t=document.getElementById("type"),e="",i=1/(point_list.length-1);if("json"==t.value){e='[{\n\t"ColorSpace" : "RGB",\n\t"Name" : "PointsMap",\n\t"NanColor" : [ 1, 0, 0 ],\n\t"RGBPoints" : [\n';for(var n=0;n<point_list.length-1;n++){var o=point_list[n];e+="\t\t"+(i*n).toFixed(4)+",\t"+o.rgb[0].toFixed(4)+",\t"+o.rgb[1].toFixed(4)+",\t"+o.rgb[2].toFixed(4)+",\n"}o=point_list[n];e+="\t\t"+(i*n).toFixed(4)+",\t"+o.rgb[0].toFixed(4)+",\t"+o.rgb[1].toFixed(4)+",\t"+o.rgb[2].toFixed(4)+"\n\t]\n}]"}else if("csv"==t.value){e="Step,L,A,B,R,G,B\n";for(n=0;n<point_list.length;n++){o=point_list[n];e+=(i*n).toFixed(4)+","+o.lab[0].toFixed(4)+","+o.lab[1].toFixed(4)+","+o.lab[2].toFixed(4)+","+o.rgb[0].toFixed(4)+","+o.rgb[1].toFixed(4)+","+o.rgb[2].toFixed(4)+"\n"}}else for(n=0;n<point_list.length;n++){o=point_list[n];e+=(i*n).toFixed(4)+"\t"+o.rgb[0].toFixed(4)+"\t"+o.rgb[1].toFixed(4)+"\t"+o.rgb[2].toFixed(4)+"\n"}return e}function load_points_from_file(t,e){var i=t.split("\n"),n=0,o=i[n];if("json"==e||"JSON"==e){for(;!o.includes("RGBPoints");)o=i[++n];for(;!o.includes("[");)o=i[++n];for(;!o.includes(",");)o=i[++n];point_list=[],select_point_list.innerHTML="",(s={}).rgb=[0,0,0],s.lab=[0,0,0],s.xy=[-1,-1];for(var l=0;l<1e3;l++){if((_=o.split(",")).length<4)break;s.rgb[0]=parseFloat(_[1]),s.rgb[1]=parseFloat(_[2]),s.rgb[2]=parseFloat(_[3]),s.lab=rgbTOlab(JSON.parse(JSON.stringify(s.rgb)));var r=10*(s.lab[0]-Math.floor(s.lab[0]));s.lab[0]=r>4?Math.floor(s.lab[0])+1:Math.floor(s.lab[0]),s.xy[0]=getX(s.lab[1]+0),s.xy[1]=getY(s.lab[2]+0);var a=!1;(s.xy[0]>canvas.width||s.xy[1]>canvas.height)&&(s.xy[0]=canvas.width/2,s.xy[1]=canvas.height/2,a=!0),a&&(s.lab[1]=getA(s.xy[0]+0),s.lab[2]=getB(s.xy[1]+0),s.rgb=labTOrgb(JSON.parse(JSON.stringify(s.lab)))),isValidRGB(s.rgb)?create_new_point(JSON.parse(JSON.stringify(s))):alert("Invalid / outside boundry point found and ignored"),o=i[++n]}}else{var s;for(point_list=[],(s={}).rgb=[0,0,0],s.lab=[0,0,0],s.xy=[-1,-1];null!=o;){var _=o.split("\t");s.rgb[0]=parseFloat(_[1]),s.rgb[1]=parseFloat(_[2]),s.rgb[2]=parseFloat(_[3]),s.lab=rgbTOlab(JSON.parse(JSON.stringify(s.rgb)));r=10*(s.lab[0]-Math.floor(s.lab[0]));s.lab[0]=r>4?Math.floor(s.lab[0])+1:Math.floor(s.lab[0]),s.xy[0]=getX(s.lab[1]),s.xy[1]=getY(s.lab[2]),create_new_point(JSON.parse(JSON.stringify(s))),o=i[++n]}}}function point_exists(t){for(i=0;i<point_list.length;i++){var e=point_list[i].xy[0],n=point_list[i].xy[1],o=t.xy[0],l=t.xy[1];if(e>=o-point_radius&&e<=o+point_radius&&n>=l-point_radius&&n<=l+point_radius)return i}return-1}function avg(t,e,i,n){var o=[0,0,0];return o[0]=(t[0]*e+i[0]*n)/(e+n),o[1]=(t[1]*e+i[1]*n)/(e+n),o[2]=(t[2]*e+i[2]*n)/(e+n),o}function point_lies_inside_boundry(t){return!!isValidRGB(t.rgb)}function create_new_point(t){var e=document.createElement("option");e.value=t.lab[0]+", "+t.rgb[0]+", "+t.rgb[1]+", "+t.rgb[2]+", ",e.innerHTML="&nbspL:"+t.lab[0].toFixed(1)+",&nbsp&nbsp R:"+t.rgb[0].toFixed(3)+",&nbsp&nbsp G:"+t.rgb[1].toFixed(3)+",&nbsp&nbsp B:"+t.rgb[2].toFixed(3)+"&nbsp&nbsp",add_after_active?(load_l_value_image(l_value),select_point_list.insertBefore(e,select_point_list[selected_point_index+1]),point_list.splice(selected_point_index+1,0,t),add_after_active=!1,add_after.style.backgroundColor=""):add_before_active?(load_l_value_image(l_value),select_point_list.insertBefore(e,select_point_list[selected_point_index]),point_list.splice(selected_point_index,0,t),add_before_active=!1,add_before.style.backgroundColor=""):(select_point_list.appendChild(e),point_list.push(t)),selected_point_index=-1,select_point_list.selectedIndex=-1,draw_points(),draw_graph(),draw_color_pattern()}function draw_points(){var t=0;for(c.clearRect(0,0,canvas.width,canvas.height);t<point_list.length-1;t++)draw_point(point_list[t].xy[0],point_list[t].xy[1],point_radius,point_color,c),draw_line(point_list[t].xy[0],point_list[t].xy[1],point_list[t+1].xy[0],point_list[t+1].xy[1],line_color,c);point_list.length>0&&draw_point(point_list[t].xy[0],point_list[t].xy[1],point_radius,point_color,c),draw_selected_point()}function remove_previous_selected(){selected_point_index>-1&&(x=point_list[selected_point_index].xy[0],y=point_list[selected_point_index].xy[1],c.beginPath(),c.strokeStyle=point_color,c.arc(x,y,point_radius,0,360),c.arc(x,y,point_radius-1,0,360),c.stroke(),c.fillRect(x-1,y-1,2,2),c.closePath(),selected_point_index=-1)}function draw_selected_point(){selected_point_index>-1&&point_list.length>0&&(x=point_list[selected_point_index].xy[0],y=point_list[selected_point_index].xy[1],c.beginPath(),c.strokeStyle=selected_point_color,c.arc(x,y,point_radius,0,360),c.arc(x,y,point_radius-1,0,360),c.stroke(),c.fillRect(x-1,y-1,2,2),c.closePath())}function draw_point(t,e,i,n,o){o.beginPath(),o.strokeStyle=n,o.arc(t,e,i,0,360),o.arc(t,e,i-1,0,360),o.stroke(),o.fillRect(t-1,e-1,2,2),o.closePath()}function draw_rect(t,e,i,n,o,l){l.beginPath(),l.strokeStyle=o,l.rect(t,e,i,n),l.stroke(),l.closePath()}function draw_line(t,e,i,n,o,l){l.beginPath(),l.moveTo(t,e),l.lineTo(i,n),l.strokeStyle=o,l.stroke(),l.closePath()}handleFiles=function(t){var e=t[0].name.split("."),i=e[e.length-1],n=new FileReader;n.addEventListener("loadend",function(){load_points_from_file(n.result,i),draw_points(),draw_graph(),draw_color_pattern()}),n.readAsText(t[0])};
