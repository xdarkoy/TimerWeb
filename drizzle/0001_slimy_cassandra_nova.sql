CREATE TABLE `demoRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`employeeCount` varchar(50),
	`country` varchar(10),
	`message` text,
	`status` enum('new','contacted','demo_scheduled','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `demoRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeSubscriptionId` varchar(64) NOT NULL,
	`planId` varchar(32) NOT NULL,
	`interval` enum('monthly','yearly') NOT NULL,
	`status` enum('active','canceled','past_due','trialing','incomplete') NOT NULL DEFAULT 'incomplete',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_stripeSubscriptionId_unique` UNIQUE(`stripeSubscriptionId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(64);