---

**AUTOPILOT CRM — PROJECT DOCUMENTATION** AI Sales Agent | Powered by Auth0 for AI Agents Version 0.1 | 20-Day Sprint | Status: In Development

---

**1\. PRODUCT OVERVIEW**

AutoPilot CRM is an AI-powered sales automation platform that deploys intelligent agents to handle the entire top-of-funnel sales process on behalf of sales representatives. The platform uses Auth0 as its core security backbone — specifically Auth0's Token Vault, Async Authorization, and Fine-Grained Authorization — to allow agents to act as real users without ever compromising security or trust.

The core insight is simple: most AI sales tools send emails from generic, impersonal inboxes that prospects immediately recognize as bots. AutoPilot CRM solves this by having the AI agent act as the actual salesperson, using their real Gmail, LinkedIn, and CRM credentials — made possible securely through Auth0's Token Vault.

THE PROBLEM WE SOLVE

Sales reps at SMBs and mid-market companies spend up to 70% of their time on repetitive outreach tasks — researching leads, writing personalized emails, following up, and scheduling demos. This leaves almost no time for actual selling. Existing tools either use impersonal bulk email blasts or require reps to manually review and send every message. Neither scales.

THE CORE VALUE PROPOSITION

Acts As You: The agent sends emails from your real Gmail account. Prospects can't tell the difference because there is none — it is your account.

You Stay in Control: Critical actions like sending proposals or booking calls pause for human approval. You approve in one tap from Slack.

Enterprise Safe: Auth0 handles all identity, token brokering, and data access controls end to end. No raw credentials are ever stored in AutoPilot's own database.

---

**2\. CORE FEATURES**

FEATURE 1 — USER AUTHENTICATION (Auth0 Universal Login)

Sales reps sign in to AutoPilot using their company SSO credentials via Auth0 Universal Login. The authentication layer supports Google Workspace, Microsoft 365, SAML 2.0, and OpenID Connect providers. Multi-factor authentication is enforced by default for all users. Session tokens are fully managed by Auth0 with configurable expiry and sliding refresh policies.

What this means for the product: Reps never create a new username or password for AutoPilot. They log in with exactly what they already use at work. Auth0 handles everything behind the scenes — token issuance, session validation, MFA challenge, and role assignment. From the rep's perspective it is a single click.

Key capabilities: Single Sign-On with Google Workspace and Microsoft 365 SAML 2.0 and OIDC support for enterprise identity providers Enforced MFA via TOTP authenticator, push notification, or SMS Role-based access control — Admin, Manager, Sales Rep, Read-Only Auth0 session management with configurable expiry and refresh windows Automatic logout on suspicious activity via Auth0 anomaly detection

FEATURE 2 — TOKEN VAULT (Auth0 Token Vault)

This is the most important feature in the entire product. When a sales rep connects their external tools — Gmail, HubSpot, LinkedIn, Calendly — Auth0 Token Vault securely stores their OAuth 2.0 access and refresh tokens. The AI agents then borrow these tokens at runtime to act on behalf of the user. At no point are raw credentials or tokens stored in AutoPilot's own database. Auth0 is the sole source of truth for all delegated credentials.

What this means for the product: When the Sender Agent sends an email, it fetches the rep's Gmail token from Auth0 Token Vault, uses it to authenticate against the Gmail API, sends the email, then releases the token. To Gmail, to the recipient, and to every email tracking tool — the email came from the rep. This is the unfair advantage AutoPilot has over every other AI sales tool.

Key capabilities: OAuth token storage for Gmail, HubSpot, LinkedIn, and Calendly Token Vault handles refresh cycles automatically — agents always have a valid token Tokens are scoped to the minimum required permissions per integration One-click token revocation — reps can disconnect any tool at any time Full audit log of every token use event — which agent used which token and when Zero raw credentials stored in AutoPilot's own infrastructure

FEATURE 3 — AI AGENT PIPELINE

AutoPilot deploys a pipeline of four specialized AI agents that work in sequence and in parallel to research leads, draft personalized outreach, and send emails as the rep. Each agent has a scoped role and only accesses the tools required for its specific job. The entire pipeline is orchestrated by a top-level Orchestrator Agent that coordinates based on the rep's stated goal.

Orchestrator Agent Accepts the rep's goal as plain text input — for example "Book 15 demos this month" — and a CSV of leads. Parses the goal into discrete tasks and dispatches them to the appropriate sub-agents. Monitors pipeline progress and handles retries or failures without rep involvement.

Research Agent Connects to HubSpot via the rep's stored OAuth token to pull existing lead data. Enriches each lead profile with LinkedIn data including company size, role, department, and recent professional activity. Uses a web search tool to find recent news, funding announcements, and product launches that can be referenced in outreach. Outputs a structured intelligence brief for each prospect that the Copywriting Agent uses as context.

Copywriting Agent Takes the lead intelligence brief and uses Claude LLM to generate a highly personalized outreach email for each prospect. A tone analyzer reads the rep's past sent emails to match their writing style, vocabulary, and sentence structure. An email template engine applies company-approved messaging frameworks and ensures brand compliance. Generates two subject line variants per email for A/B testing.

Sender Agent Takes the approved email drafts and sends them using the rep's Gmail OAuth token retrieved from Auth0 Token Vault. Emails are sent from the rep's actual email address. Every send event is logged back to HubSpot CRM using the rep's HubSpot token. Handles bounce detection, unsubscribe compliance, and automatic retry logic on transient failures.

FEATURE 4 — ASYNC AUTHORIZATION (Auth0 Async Authorization)

When the AI agent encounters a high-stakes action — sending a pricing proposal, booking a demo call, committing to a discount, or making any binding statement on behalf of the rep — it immediately pauses and requests human approval via Auth0's asynchronous authorization flow. The rep receives a Slack message with a full preview of the intended action and can approve, edit, or reject with a single tap.

What this means for the product: The agent is not autonomous for everything. For routine outreach it runs fully automatically. But for anything that carries real business weight — a proposal, a commitment, a price — a human is always in the loop. Auth0 Async Authorization is the mechanism that makes this pause-and-resume pattern work reliably.

Key capabilities: Configurable action thresholds — admins define exactly what triggers a pause Real-time Slack notification with full draft preview and one-tap approve button Auth0 approval webhook resumes the agent the moment the rep approves Edit flow — rep can rewrite the draft before approving, then re-submit Timeout policy — if rep doesn't respond within 2 hours, the action is automatically cancelled Full approval audit trail in Auth0 — every decision logged with timestamp and actor

FEATURE 5 — FINE-GRAINED AUTHORIZATION FOR RAG (Auth0 FGA)

When the RAG Agent queries the internal knowledge base to pull proposal content, case studies, pricing sheets, or contract templates, Auth0 Fine-Grained Authorization acts as a document-level access control layer. Every retrieval query is filtered through the rep's current permission set. The agent only surfaces documents that the specific user is authorized to see — even if those documents live in the same vector database as restricted content.

What this means for the product: A sales rep should never see the board presentation, the M\&A due diligence memo, or the unreleased pricing tier — and neither should their agent. Auth0 FGA ensures that the agent's knowledge is bounded by exactly the same rules that govern the rep's own access. This is what makes AutoPilot enterprise-ready.

Key capabilities: Document-level permissions — every doc in the knowledge base is tagged with a required access tier Rep permissions are inherited directly from their Auth0 roles and organizational unit Confidential documents are hard-blocked regardless of query relevance score Permission checks happen at query time, not at indexing time — permissions are always current Hierarchical permission model — organization level, team level, and individual level Full FGA audit log — every retrieval attempt is logged with the outcome and the reason

---

**3\. TECHNICAL STACK**

Frontend: Next.js \+ Tailwind CSS — rep dashboard, approval UI, onboarding wizard Backend: Node.js \+ Express — API layer, agent orchestration, webhook handlers AI Agents: LangGraph (Python) — multi-agent workflow orchestration LLM: Claude via Anthropic API — email generation and reasoning Authentication: Auth0 Universal Login — SSO, MFA, session management Token Storage: Auth0 Token Vault — OAuth token brokering for all integrations Async Auth: Auth0 Async Authorization — human-in-the-loop approval flow Access Control: Auth0 FGA — document-level RAG permission filtering Vector Database: Pinecone — RAG document storage and retrieval CRM Integration: HubSpot API — lead data and activity logging Email: Gmail API via OAuth (Token Vault) — send emails as the rep Notifications: Slack API — approval pings and agent status alerts Database: PostgreSQL on Supabase — application data and audit logs Deployment: Vercel (frontend) \+ Railway (backend and agents)

---

**4\.SUCCESS CHECKLIST**

Auth0 login and MFA working end to end — must work with zero errors Token Vault connected for Gmail and HubSpot — token refresh cycle verified Agent sends email as rep from real Gmail account — demonstrated live Async authorization approval flow working — Slack ping, one-tap approve, agent resumes FGA blocks confidential document in RAG query — demonstrated live with clear before/after Full Sarah scenario runs end to end in under 3 minutes with no errors

---

