package com.zx.service;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.EncodeException;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;



import com.zx.entity.Data;
import com.zx.entity.User;
import com.zx.hibernate.CRUD;
import com.zx.utils.ChartUtils;
import com.zx.websocket.Test;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("/resteasy")
public class Service {
	static CopyOnWriteArraySet<Test> webSocketSet = Test.webSocketSet;
	public static void queryall() throws IOException, EncodeException{
		List<User> user = CRUD.QueryAll();
		JSONArray result = JSONArray.fromObject(user); 
		for (Test item : webSocketSet) {
			try {
				item.sendMessage("queryall&"+result.toString());
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
	}
		
	public static void add(String name,int age) throws IOException{
		int id = CRUD.Add(name,age);
		int  exist = CRUD.isexist(name, age) - 1;
		for (Test item : webSocketSet) {
			try {
				if(exist == 0) {
					item.sendMessage("add&true:"+id);
				}else {
					item.sendMessage("add&"+id+":"+exist);
				}
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
		
	}
	
	
	public static void querysingle(int id) throws IOException {
		
		User user = CRUD.QuerySingle(id);
		JSONArray result = JSONArray.fromObject(user); 
		for (Test item : webSocketSet) {
			try {
				item.sendMessage("querysignal&"+result.toString());
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
	
	} 
	public static void update(int id, String name,int age) {
		CRUD.Upate(id,name,age);
		for (Test item : webSocketSet) {
			try {
				item.sendMessage("update&"+"更新信息  id"+id);
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
	}
	
	public static void delete(int id) {
		CRUD.Delete(id);
		for (Test item : webSocketSet) {
			try {
				item.sendMessage("delete&"+"删除信息 id"+id);
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
	}
	
	public static void getecharts() throws IOException {
		List<Data> data = new ArrayList<Data>();
		data = ChartUtils.getDataList();
		
		JSONArray result = JSONArray.fromObject(data); 
		for (Test item : webSocketSet) {
			try {
				item.sendMessage("getecharts&"+result.toString());
			} catch (IOException e) {
				e.printStackTrace();
				continue;
			}
		}
	}
	
	
}