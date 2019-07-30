package com.zx.service;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
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

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("/resteasy")
public class Service {
	// http://localhost:8080/mytest/zx/restesy/??
	@GET
	@Path("/{param}")
	public Response printMessage(@PathParam("param") String msg) {
		String result = "Restful example : " + msg;
		return Response.status(200).entity(result).build();
	}

	@POST
	@Path("getName")
	public String getName(@FormParam("fname") String fname, @FormParam("lname") String lname) {
		String result = "RESTEasy Hello World : " + fname + lname;
		System.out.println("fname" + fname);
		return result;
	}

	@GET
	@Produces("application/json")
	@Path("zx/{id}")
	public String get(@PathParam("id") String id) {
		String result = "Hello " + id;
		return result;
	} 
	
	@POST
	@Path("queryall")
	public void queryall(@Context HttpServletResponse response) throws IOException{
		response.setCharacterEncoding("utf-8");
		response.setContentType("utf-8");
		PrintWriter out = response.getWriter();
		List<User> user = CRUD.QueryAll();
		JSONArray result = JSONArray.fromObject(user); 
		out.print(result);
		System.out.println("zxxz");	
		out.close();
	}
	
	@POST
	@Produces("text/plain; charset=utf-8")
	@Path("add")
	public void add(@QueryParam("name") String name,@FormParam("age") int age,@Context HttpServletResponse response) throws IOException{
		int id = CRUD.Add(name,age);
		int exist = CRUD.isexist(name, age) - 1;
		PrintWriter out = response.getWriter();
		if(exist == 0) {
			out.print("true:"+id);
		}else {
			out.print(id+":"+exist);
		}
		out.close();
	}
	
	@POST
	@Path("querysingle")
	public void querysingle(String sid,@Context HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(sid);
		response.setCharacterEncoding("utf-8");
		response.setContentType("utf-8");
		PrintWriter out = response.getWriter();
		User user = CRUD.QuerySingle(id);
		JSONObject jsonObject = JSONObject.fromObject(user);
		System.out.println(jsonObject.toString());
		out.print(jsonObject);
		out.close();
	} 
	@POST
	@Path("update")
	public void update(@FormParam("id") int id, @QueryParam("name") String name,@FormParam("age") int age) {
		System.out.println("进入");
		System.out.println(id);
		System.out.println(name);
		CRUD.Upate(id,name,age);
	}
	
	@POST
	@Path("delete")
	public void delete(@FormParam("id") int id) {
		CRUD.Delete(id);
	}
	
	@POST
	@Path("get")
	public void get(@Context HttpServletResponse response) throws IOException {
		response.setCharacterEncoding("utf-8");
		response.setContentType("utf-8");
		PrintWriter out = response.getWriter();
		List<Data> data = new ArrayList<Data>();
		System.out.println("你来没");
		data = ChartUtils.getDataList();
		
		JSONArray result = JSONArray.fromObject(data); 
		out.print(result);
		System.out.println(result.toString());	
		out.close();
	}
	
	
}