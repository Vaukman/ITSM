import React from "react";

function Help() {
  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-secondary border-b-2 border-accent pb-2">
          ITSM Help & Terms of Service
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neon mb-3">1. Overview</h2>
          <p className="text-accent leading-relaxed">
            Welcome to the IT Service Management (ITSM) platform. This system is
            designed to streamline internal communication, ticket handling, and
            service tracking for technical issues. By accessing or using this
            service, you agree to the terms outlined on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neon mb-3">
            2. User Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-2 text-accent">
            <li>Users must provide accurate and up-to-date information.</li>
            <li>
              Unauthorized access or data modification is strictly prohibited.
            </li>
            <li>
              All support tickets should be described clearly and respectfully.
            </li>
            <li>
              Users are expected to maintain professional communication at all
              times.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neon mb-3">
            3. Data Handling
          </h2>
          <p className="text-accent leading-relaxed">
            All user data, including emails, ticket information, and activity
            logs, are securely stored and used solely for ITSM-related purposes.
            Personal data is never shared with third parties without consent,
            except where required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neon mb-3">
            4. Ticket Management Policy
          </h2>
          <p className="text-accent leading-relaxed">
            Tickets are prioritized based on their severity and impact.
            Administrators reserve the right to reassign or close tickets that
            are duplicates or resolved. Users are encouraged to include as much
            relevant detail as possible to ensure efficient support.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neon mb-3">
            5. System Availability
          </h2>
          <p className="text-accent leading-relaxed">
            Our ITSM system strives for maximum uptime and reliability. However,
            periodic maintenance or updates may cause temporary downtime. We
            appreciate your understanding during these intervals.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-neon mb-3">
            6. Contact & Support
          </h2>
          <p className="text-accent leading-relaxed">
            If you encounter issues or need additional help, please open a
            support ticket under the{" "}
            <span className="text-secondary font-medium">Help</span> or{" "}
            <span className="text-secondary font-medium">Contact</span> section.
            Our IT administrators will respond as soon as possible.
          </p>
        </section>

        <div className="mt-10 text-center text-sm text-accent">
          <p>
            © {new Date().getFullYear()} ITSM Platform. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-secondary">
            Built for internal support management and ticket automation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
