# Security Policy

## Tamerian Materials — Patent-Pending Technology

This repository contains the source code for the Tamerian Materials website, showcasing patent-pending multi-modal energy harvesting composite technology.

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Contact:** tamerianmaterials@gmail.com

**Please include:**
- A description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Suggested remediation (if any)

**Response timeline:**
- Acknowledgment within 48 hours
- Assessment within 7 days
- Resolution within 30 days for confirmed vulnerabilities

## Security Measures

This project implements the following security hardening:

- **Content Security Policy (CSP):** Strict policy limiting script sources, image origins, and frame embedding
- **HTTP Strict Transport Security (HSTS):** Enforced HTTPS with 2-year max-age and preload
- **Anti-Clickjacking:** X-Frame-Options DENY and frame-ancestors 'none' in CSP
- **MIME Sniffing Protection:** X-Content-Type-Options nosniff
- **Referrer Policy:** strict-origin-when-cross-origin
- **Permissions Policy:** Restricts access to sensitive browser APIs
- **Cross-Origin Policies:** COOP, COEP, and CORP headers configured
- **DOM Integrity Monitoring:** Runtime mutation observer protects patent data from tampering
- **External Link Hardening:** Automatic noopener/noreferrer on all external links
- **Patent Data Integrity:** Runtime hash verification of critical patent information

## Intellectual Property Notice

All content, including patent claims, technical specifications, and composite formulations described on this website, is protected under:

**U.S. Patent Application No. 63/934,269**
Filed: December 11, 2025
Inventor: Jonathan Peoples
Status: Patent Pending

Unauthorized reproduction, modification, or misrepresentation of patent claims or technical data is prohibited.

## License

All rights reserved. (c) 2025 Tamerian Materials / Jonathan Peoples
