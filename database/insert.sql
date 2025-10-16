INSERT INTO roles (id, name) VALUES
(1, 'Admin'),
(2, 'Third'),
(3, 'Second'),
(4, 'First');

INSERT INTO user_status (id, name, description) VALUES
(1, 'Active', 'User is active'),
(2, 'Inactive', 'User is inactive'),
(3, 'Suspended', 'User is suspended');

INSERT INTO users (first_name, last_name, email, password, role_id, id_status)
VALUES ('admin', 'admin', 'admin@admin.com', '$2y$10$kzTAdgT9CaPbXDfLqT/vBekKuG4DEP6h8C8GfWMMjTmnI.PidZqQa', 1, 1);
