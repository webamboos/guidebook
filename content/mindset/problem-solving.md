---
title: Problem Solving
---

As a programmer you will be faced with many challenges throughout your career. From stubborn clients who don't know what they want but they want it yesterday, to colleagues who have been struggling with a build issue for two days, all being problems that require solving.

There is no definitive solution to any problem, but there are *good enough* solutions that you can come up with in the shortest amount of time that will satisfy, in one way or another, the other party.

> [!tip] The 80/20 Rule
> Also known as [the Pareto Principle](https://en.wikipedia.org/wiki/Pareto_principle), states that 80% of the consequences come from 20% of the causes. This is a good rule of thumb to use in any problem solving situation to determine whether the amount of effort is worth it or not. For instance, if we can build 80% of a feature with ony 20% effort, then that is a good trade.

Finding the right solution at the right time is not easy, and it certainly won't occur to you all the time, but actively tring to find solutions to the problems you encounter will make it easier with time. "*But how do I find the right solution?*", you might ask. The answer to that is the classic: *it depends*.

### The root cause

Many times people come to us asking for solutions to their problems. An issue with that is the lack of context they usually provide, this is one of the reasons you'll hear the answer "it depends" when senior developers respond to the question "how long will this take to build". Without enough context, solutions can range from simple but ineffective, to complex and costly, while still not solving the problem. People may even ask for solutions to the wrong problems.

Every problem is caused by something. Finding that *something* can be quick and easy, or tiresome and hard. In such situations, as developers, we need to start asking questions and exploring the mind of the people looking for solutions. A good technique is the ["5 whys"](https://en.wikipedia.org/wiki/Five_whys). Finding the root cause can lead to better and more sustainable solutions (and sometimes much easier), fixing problems right where they appear, instead of trying to fix the symptoms.

### Finding constraints

Maybe you need to improve the performance of a search algorithm, or maybe you are working with Big Data and need to integrate an ETL pipeline to find temperature anomalies in the thousands of warehouses of this ice-cream factory. No matter what the problem, there are always some constraints that you need to find.

You may have heard of the "project management triangle" (or other variations), but if not, you have now. 

<figure class="figure-box">

![[quality-triangle.svg|A triangle with the words "Scope", "Cost" and "Time" in each corner, and "Quality" written in the middle.]]

<figcaption>The Project Management Triangle</figcaption>
</figure>

The triangle is most often used in project management, but it can also be used for problem solving. Every project has some constraints, and they are usually either time, cost, or the scope(amount of features required). You cannot have a high quality project, built cheaply and timely, so you'll need to find the best trade-offs. If a client needs both a high-quality product and fast, then they need a lot of money to throw at the problem.

Most often though, the client doesn't have the money, or the time. So we need to find the best balance. We can reduce the scope (i.e. build fewer features), so we can ship faster and cheaper. Or, we can build all the features, but then the quality takes a hit (but we want to avoid that, because developers don't like to build poor quality things). In the end, it's all trade-offs, so you need to be able to adapt to the problem at hand, and, most importantly, [communicate](#communicating-solutions).

### Communicating solutions

You are never alone. While many programming problems can be solved quickly, without much (if any) input from others, most problems usually involve more that just the few lines of code around the current file.

Let's say you need to build a password reset mechanism. You know that you need to send emails with the password reset link, but you don't have an email service you can use. You also need to take into account that your system will probably send many other types of emails, such as notifications or newsletters. Immediately, the problem becomes slighly more complex. Maybe the newsletters will be sent by the client using a visual editor, or the notifications will also be sent as SMS or as push notifications.

Suddenly you need to find a service that can handle all of these (or multiple services). However, these services usually cost money, you won't use your own money for that, but the clients'. You could just tell them what you need, but they won't know what to do and they won't understand why they need to pay. That's where you come in.

Usually problems have multiple possible solutions, it's your job to find the best solutions taking into account the [constraints](#finding-constraints) and present them to the team and/or the client. This might involve a document (or just a Slack message) outlining the problem, possible solutions (their benefits, costs, risks, etc.), future predictions (e.g., a more expensive solution could solve problems that might arise in the future), and your personal recommendation (and why). This won't only make it easier for other stakeholders to take the *right decisions based their needs*, but it also proves that you are *trustworthy*, did the required research and that you really are interested in the best possible solutions for the product under development.

### Being proactive

Todo.
