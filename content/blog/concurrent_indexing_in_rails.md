---
title: "How to Index Large Database tables in Rails"
date: "2025-08-11"
description: "Adding indexes to large postgres tables in rails with minimal downtime."
tags: ["postgres", "ruby on rails"]
author: "Mike Matovu"
---

Have you ever needed to add an index to a huge database table? Running a migration on a table with many records is a bit tricky. A standard rails migration locks the table, potentially causing your application to become unresponsive for an extended period.

Fortunately, there's a powerful tool for this in PostgreSQL called **concurrent indexing**, and Rails has a simple way to let you use it.

-----

### The Problem with a Standard Index Migration

When you run a default `add_index` command in a Rails migration, PostgreSQL places an **exclusive lock** on the table. This means no other transactions can read from or write to the table.  For a small table, this happens in a fraction of a second, so you never notice. For a table with millions of records, the process of building the index takes a long time which might cause significant downtime for your users.

-----

### The Solution: `algorithm: :concurrently`

We can chose to create the index concurrently. This allows PostgreSQL to build the index without locking the table for the entire duration. Your application contines to perform `INSERT`, `UPDATE`, and `DELETE` operations while the index is being created.

The trick is to add `algorithm: :concurrently` to your `add_index` call.

```ruby
class AddIndexToPostsUserId < ActiveRecord::Migration[8.0]
  def change
    add_index :posts, :user_id, algorithm: :concurrently
  end
end
```

-----

### The Necessary Helper: `disable_ddl_transaction!`

PostgreSQL's concurrent index creation cannot run inside a database transaction. By default, Rails wraps every migration in a transaction to ensure that if anything goes wrong, the changes are rolled back. Since concurrent indexing is an operation that breaks this rule, you must explicitly disable the transaction for that specific migration.

You do this by adding `disable_ddl_transaction!` at the top of your migration class.

```ruby
class AddIndexToPostsUserId < ActiveRecord::Migration[8.0]
  disable_ddl_transaction!

  def change
    add_index :posts, :user_id, algorithm: :concurrently
  end
end
```

Remember, by using this command, you're opting out of the safety of automatic rollbacks for this migration.

-----

### A Few Important Rules to Remember

1.  **One at a Time:** You must create each index individually. If you're adding multiple indexes, each one needs its own `add_index` command. You can't use an array of columns.

    ```ruby
    # This is correct
    add_index :users, :email, algorithm: :concurrently
    add_index :users, :created_at, algorithm: :concurrently

    # This will not work
    # add_index :users, [:email, :created_at], algorithm: :concurrently
    ```

2.  **Resource Intensive:** While it doesn't cause a lock, concurrent indexing is still a resource-intensive process. If possible, run these migrations during off-peak hours to minimize any performance degradation.