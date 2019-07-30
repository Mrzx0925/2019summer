package com.zx.hibernate;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.zx.entity.User;
import com.zx.utils.HibernateUtils;

public class CRUD {

	public static List<User> QueryAll() {
		
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		SQLQuery sqlQuery = session.createSQLQuery("select * from user");
		sqlQuery.addEntity(User.class);
		// 调用sqlQuery里面的方法
		List<User> list = sqlQuery.list();
	//	System.out.println(list.get(0).toString());
//					 提交事务
		tx.commit();
//					 关闭资源
		session.close();
		return list;
	}

	public static int Add(String name,int age) {
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		User user = new User();
		user.setName(name);
		user.setAge(age);
		session.save(user);
		
		tx.commit();
//		 关闭资源
		session.close();
		return user.getId();
	}
	
	public static void AddUser(User user) {
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		session.save(user);
	
		tx.commit();
//		 关闭资源
		session.close();
	}

	public static User QuerySingle(int id) {
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		User user = (User) session.get(User.class, id);
		tx.commit();
//		 关闭资源
		session.close();
		return user;
	}
	
	public static void Upate(int id,String name,int age) {
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		User user = (User) session.get(User.class, id);
		user.setName(name);
		user.setAge(age);
		session.update(user);
		//System.out.println(user.toString());
		tx.commit();
//		 关闭资源
		session.close();
	}
	public static void Delete(int id) {
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		User user = (User) session.get(User.class, id);
		session.delete(user);
		//System.out.println(user.toString());
		tx.commit();
//		 关闭资源
		session.close();
	}
	
	public static int isexist(String name,int age) {
		Session session = HibernateUtils.getSession();
		Transaction tx = session.beginTransaction();
		String hql="select u.id from User u where u.name ='"+name+"' and u.age='"+age+"'";
		
		Query Query = session.createSQLQuery(hql);
		List<User> list = Query.list();
		tx.commit();
		//System.out.println(user.toString());
//		 关闭资源
		session.close();
		
		return list.size();
	}

}
