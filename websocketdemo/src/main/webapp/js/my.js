// 对应点击增删改查按钮
$(function() {
	var method = "";// 到底点击了谁，执行谁的局部刷新
	$('#add').click(function() {
		var name = form.name.value.trim();
		var age = form.age.value.trim();
		// var url = "zx/resteasy/add?name="+name;
		// alert(url);
		if (name == "" || age == "") {
			layer.msg('姓名或者年龄应不为空', {
				icon : 5
			});
		} else {
			if (isNaN(age) == true || age < 0 || age > 100) {
				layer.msg('年龄应该为数字,且大于0小于100', {
					icon : 5
				});
			} else if (!judgename(name)) {
				layer.msg('姓名不要含有特殊字符，且姓名的长度小于8', {
					icon : 5
				});
			} else {
				// form.action = url;
				// form.submit();
				send("add:" + name + ":" + age);
			}
		}
	});
	$('#delete').click(function() {
		var id = form.id.value.trim();
		if (id == "") {
			layer.msg('未选择数据', {
				icon : 5
			});
		} else {
			send("delete:" + id);
		}
	});
	$('#update').click(function() {
		var age = form.age.value.trim();
		var id = form.id.value.trim();
		var name = form.name.value.trim();
		if (id == "") {
			layer.msg('未选择数据', {
				icon : 5
			});
		} else if (name == "" || age == "") {
			layer.msg('姓名或者年龄应不为空', {
				icon : 5
			});
		} else if (isNaN(age) == true || age < 0 || age > 100) {
			layer.msg('年龄应该为数字,且大于0小于100', {
				icon : 5
			});
		} else if (!judgename(name)) {
			layer.msg('姓名不要含有特殊字符，且姓名的长度小于8', {
				icon : 5
			});
		} else {
			send("update:" + id + ":" + name + ":" + age);
		}
	});
	$('#query').click(function() {
		var id = form.queryid.value.trim();
		if (id == "" || isNaN(id) == true) {
			layer.msg('未添加查询数据或者输入查询的ID不为数字', {
				icon : 5
			});
		} else {
			var msg = [];
			// send("querysignal:"+id);
			msg = eachtr(id);
			if (msg[0] == true) {
				$("#id").val(msg[1]);
				$("#name").val(msg[2]);
				$("#age").val(msg[3]);
				$("#queryid").val("");
			} else {
				layer.msg('无此数据', {
					icon : 5
				});
			}
		}

	});
	
	
	//最开始执行的函数
	$(document).ready(function() {
		queryall();
		send("getecharts");
	});
});
// 获得点击事件
$(function() {
	var numo = [];
	$("#tb").on("click", "tr", function(event) {
		// $(this).closest("tr").find("td").eq(0).text()
		// 获取点击的id
		if ($(this).attr("id") == "head") {
			// $(this).addClass("color").siblings();
			$("tr").removeClass("color");
		} else {
			$(this).addClass("color").siblings().removeClass("color");
		}
		$("#id").val($(this).closest("tr").find("td").eq(0).text());
		$("#name").val($(this).closest("tr").find("td").eq(1).text());
		$("#age").val($(this).closest("tr").find("td").eq(2).text());
	});

	$("#pie").click(function() {
		numo = getnumo();
		pie(numo);
		$("#flag").val("pie");
	});
	$("#columns").click(function() {
		numo = getnumo();
		columns(numo);
		$("#flag").val("columns");
	});
	$("#line").click(function() {
		numo = getnumo();
		line(numo);
		$("#flag").val("line");
	});
	$("#radar").click(function() {
		numo = getnumo();
		radar(numo);
		$("#flag").val("radar");
	});
	
});
// 点击导入导出按钮
$(function() {
	$('#in').click(function() {
		display();
	});
	$('#out').click(function() {
		// alert("导出");
		window.location.href = "zx/download/test";
	});
});

// 展示上传文件确认
function display() {
	var title = "上传文件你要知道几点<br/>①：文件类型为excel类文件即xls，xlsx<br/>"
			+ "②：文件上传内容为姓名为和年龄（name，age）<br/>"
			+ "③：如果你第一行无相关对应标题我们会默认为第一行为姓名，第二行为年龄<br/>"
			+ "④：如果你第一行有多个相关标题我们会选择最前面的两列，注意我们不读取超过100列的Excel文件<br/>"
			+ "⑤：我们会对上传文件的内容进行判断，姓名不含有特殊字符和数字最大长度为8，年龄为数字，限制范围为0-100，同时我们不读取空行，内容不符合要求我们会在导入中取出，请注意，当连续五行出错的时候我们就会终止导入，谢谢<br/>"
			+ "⑥：我们会返回相关错误信息，不包括空行"
	layer.confirm(title, {
		btn : [ '选择文件', '再去看看文件' ]
	// 按钮
	}, function() {
		// alert($("#file").val());
		// confirmfile();
		$("#file").trigger("click");
		layer.closeAll();
	}, function() {
		layer.msg('好的', {
			icon : 1
		});
	});
}

//确定文件
function confirmfile() {
	var filename = $("#file").val();
	alert(filename);
	var filetype = filename.substring(filename.lastIndexOf(".") + 1);
	if (filetype == "") {
	} else if (filetype != "xls" && filetype != "xlsx") {
		layer.msg('请上传xls或者xlsx的Excel文件', {
			icon : 5
		});
	} else {

		$('#upfile').ajaxSubmit({
			type : 'post',
			url : "zx/upload",
			success : function(data) {
				// layer.msg(data, {icon: 1});
				setTimeout("queryall();", 400);
				setTimeout(getmethod(), 400);
				var msg = getmsg(data);
				layer.confirm(msg, {
					btn : [ '下载错误信息', '我知道了' ],
					icon : 3,
					title : '提示',
					area : [ '330px', '300px' ]
				// 按钮
				}, function() {
					downloadmsg();
					layer.closeAll();
				}, function() {
				});
			}
		});

	}
	$("#file").val("");
}

// 截取替换获取的错误信息
function getmsg(str) {
	var strmsg = str.replace("[", "").replace("]", "");
	var datamsg = strmsg.split(",");
	var msg = "";
	for ( var index in datamsg) {
		var i = parseInt(index) + 1;
		msg += i + ": " + datamsg[index] + "<br/>";
	}
	return msg;

}

// 下载错误信息文件
function downloadmsg() {
	window.location.href = "zx/download/msg";
}

// 判断上传的姓名是否含有特殊字符以及长度是否符合要求
function judgename(str) {
	var re = /^[\u4e00-\u9fa5a-z]+$/gi;// 只能输入汉字和英文字母，判断姓名长度是否大于8
	if (re.test(str)) {
		return true;
	} else if (str.length > 8) {
		return false;
	} else {
		return false;
	}
}
// 遍历 tr 下的td
function eachtr(id) {
	var msg = [];
	msg[0] = false;
	$('#tb tr').each(function(i) { // 遍历 tr
		if (id == $("tr").eq(i).find("td:eq(0)").text()) {
			var num = parseInt(parseInt(i - 1) * 39 + 88); // 移动距离
			$(this).addClass("color").siblings().removeClass("color");
			$('.dtab').animate({
				scrollTop : num
			}, 'slow');
			msg[0] = true;
			msg[1] = $("tr").eq(i).find("td:eq(0)").text();
			msg[2] = $("tr").eq(i).find("td:eq(1)").text();
			msg[3] = $("tr").eq(i).find("td:eq(2)").text();
		}
		
	});
	return msg;
}



//图方法
//得到点击了哪个按钮，返回对应方法
function getmethod() {
	//alert("zx");
	var method = "";
	// alert($("#flag").val());
	var flag = $("#flag").val();
	//alert($("#flag").val());
	if (flag == "columns") {
		method = "columns(numo);";
		// alert(method);
	} else if (flag == "pie") {
		method = "pie(numo);";
	} else if (flag == "line") {
		method = "line(numo);";
	} else if (flag == "radar") {
		method = "radar(numo);";
	}
	return method;
}
// 得到数据中最大值给雷达图用
function getdatamax() {
	var numo = getnumo();
	var max = 0;
	for (var i = 0; i < numo.length; i++) {
		if (max < numo[i]) {
			max = numo[i];
		}
	}
	return max;
}

//查询所有的信息
function queryall() {
	send("queryall");
	// 预期返回值类型 xml json text
	$("#id").val("");
	$("#name").val("");
	$("#age").val("");
	$("#queryid").val("");
}

