INSERT INTO roles (id, name) VALUES
(1, 'Admin'),
(2, 'Third'),
(3, 'Second'),
(4, 'First');

INSERT INTO users (first_name, last_name, email, password, role_id, id_status)
VALUES ('admin', 'admin', 'admin@admin.com', '$2y$10$kzTAdgT9CaPbXDfLqT/vBekKuG4DEP6h8C8GfWMMjTmnI.PidZqQa', 1, 1);

INSERT INTO categories (id, name, description) VALUES
(1, 'Hardware Issue', 'Problems related to physical devices such as computers, printers, monitors, etc.'),
(2, 'Software Bug', 'Errors or issues in applications, operating systems, or internal tools.'),
(3, 'Network Problem', 'Connectivity issues, slow network speeds, or connection loss.'),
(4, 'Account / Access Issue', 'Login, password reset, or permission-related problems.'),
(5, 'Other', 'General inquiries or issues that do not fit into the listed categories.');

INSERT INTO ticket_priority (id, name, description) VALUES
(1, 'Low', 'Low priority ticket, non-urgent tasks.'),
(2, 'Medium', 'Medium priority ticket, should be addressed soon.'),
(3, 'High', 'High priority ticket, needs immediate attention.');

INSERT INTO user_status (id, name, description) VALUES
(1, 'Active', 'User is active and can create tickets.'),
(2, 'Inactive', 'User is inactive, cannot create tickets.'),
(3, 'Suspended', 'User account is suspended.');
