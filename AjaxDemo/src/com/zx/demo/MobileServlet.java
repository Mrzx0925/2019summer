package com.zx.demo;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MobileServlet
 */
@WebServlet("/MobileServlet")
public class MobileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
  
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("utf-8");
		String mobile = request.getParameter("mobile");
		System.out.println(mobile);
		PrintWriter	out = response.getWriter();
		if("188".equals(mobile)) {
			//out.write("true");
			out.write("{\"msg\":\"true\"}");
		}else {
			//out.write("false");
			out.write("{\"msg\":\"false\"}");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
