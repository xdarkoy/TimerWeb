import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  /** Stripe Customer ID - essential for API references */
  stripeCustomerId: varchar("stripeCustomerId", { length: 64 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Subscriptions table - stores only essential Stripe IDs
 * All other subscription details are fetched from Stripe API
 */
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  /** Stripe Subscription ID - essential for API references */
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 64 }).notNull().unique(),
  
  /** Plan identifier (starter, professional, enterprise) */
  planId: varchar("planId", { length: 32 }).notNull(),
  
  /** Billing interval (monthly, yearly) */
  interval: mysqlEnum("interval", ["monthly", "yearly"]).notNull(),
  
  /** Cached status for performance - synced via webhooks */
  status: mysqlEnum("status", ["active", "canceled", "past_due", "trialing", "incomplete"]).default("incomplete").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

/**
 * Demo requests from the marketing website
 */
export const demoRequests = mysqlTable("demoRequests", {
  id: int("id").autoincrement().primaryKey(),
  company: varchar("company", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  employeeCount: varchar("employeeCount", { length: 50 }),
  country: varchar("country", { length: 10 }),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "demo_scheduled", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertDemoRequest = typeof demoRequests.$inferInsert;
