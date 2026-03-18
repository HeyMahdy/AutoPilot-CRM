"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CampaignStatus = "Draft" | "Scheduled" | "Running" | "Completed";

interface Campaign {
  id: string;
  name: string;
  owner: string;
  channel: "Email" | "LinkedIn" | "Multichannel";
  status: CampaignStatus;
  createdAt: string;
  scheduledAt?: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  stage: "New" | "Contacted" | "Meeting Booked" | "Qualified" | "Unqualified";
  owner: string;
  lastActivity: string;
  score: number;
}

interface ApprovalItem {
  id: string;
  type: "Email" | "Sequence" | "Playbook";
  title: string;
  campaign: string;
  owner: string;
  status: "Pending" | "Approved" | "Edited";
  submittedAt: string;
}

interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  channel: "Gmail" | "HubSpot" | "LinkedIn" | "Calendly" | "System";
  createdAt: string;
  meta?: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "cmp-1",
    name: "Q2 Outbound — SaaS Founders",
    owner: "You",
    channel: "Multichannel",
    status: "Running",
    createdAt: "2026-03-01",
    scheduledAt: "2026-03-05"
  },
  {
    id: "cmp-2",
    name: "Inbound Trials Nurture",
    owner: "You",
    channel: "Email",
    status: "Scheduled",
    createdAt: "2026-03-10",
    scheduledAt: "2026-03-21"
  },
  {
    id: "cmp-3",
    name: "Lost Deals Winback",
    owner: "Team",
    channel: "Email",
    status: "Draft",
    createdAt: "2026-03-15"
  }
];

const MOCK_LEADS: Lead[] = [
  {
    id: "ld-1",
    name: "Alex Johnson",
    company: "Acme Analytics",
    title: "Head of Sales",
    email: "alex@acmeanalytics.com",
    stage: "Meeting Booked",
    owner: "You",
    lastActivity: "Today · AI drafted follow-up",
    score: 92
  },
  {
    id: "ld-2",
    name: "Maya Patel",
    company: "Nimbus Cloud",
    title: "VP Revenue",
    email: "maya@nimbuscloud.io",
    stage: "Contacted",
    owner: "You",
    lastActivity: "Yesterday · Opened sequence step 1",
    score: 78
  },
  {
    id: "ld-3",
    name: "Daniel Lee",
    company: "Northwind Labs",
    title: "Founder",
    email: "daniel@northwindlabs.ai",
    stage: "New",
    owner: "You",
    lastActivity: "Today · Imported from LinkedIn",
    score: 65
  }
];

const MOCK_APPROVALS: ApprovalItem[] = [
  {
    id: "ap-1",
    type: "Email",
    title: "Intro email to Alex @ Acme",
    campaign: "Q2 Outbound — SaaS Founders",
    owner: "You",
    status: "Pending",
    submittedAt: "5 min ago"
  },
  {
    id: "ap-2",
    type: "Sequence",
    title: "3-step follow-up for trials",
    campaign: "Inbound Trials Nurture",
    owner: "You",
    status: "Pending",
    submittedAt: "40 min ago"
  }
];

const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  {
    id: "log-1",
    actor: "You",
    action: "Approved email",
    target: "Intro email to Alex @ Acme",
    channel: "Gmail",
    createdAt: "2 min ago",
    meta: "Sent via AI Sales Agent · Logged to HubSpot"
  },
  {
    id: "log-2",
    actor: "AI Sales Agent",
    action: "Created lead",
    target: "Daniel Lee · Northwind Labs",
    channel: "LinkedIn",
    createdAt: "10 min ago",
    meta: "Imported from LinkedIn search · Added to Q2 Outbound"
  },
  {
    id: "log-3",
    actor: "Calendly",
    action: "Meeting booked",
    target: "Demo with Maya @ Nimbus Cloud",
    channel: "Calendly",
    createdAt: "Today · 09:15",
    meta: "Synced to HubSpot and Google Calendar"
  }
];

type DashboardTab = "overview" | "campaigns" | "leads" | "approvals" | "activity";

export default function RepDashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [leads] = useState<Lead[]>(MOCK_LEADS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(MOCK_APPROVALS);
  const [auditLog] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOG);

  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [editingApproval, setEditingApproval] = useState<ApprovalItem | null>(
    null
  );

  const runningCampaigns = useMemo(
    () => campaigns.filter((c) => c.status === "Running").length,
    [campaigns]
  );

  const meetingsBooked = useMemo(
    () => leads.filter((l) => l.stage === "Meeting Booked").length,
    [leads]
  );

  const pendingApprovals = useMemo(
    () => approvals.filter((a) => a.status === "Pending").length,
    [approvals]
  );

  return (
    <main className="min-h-screen px-4 py-8 flex justify-center">
      <section className="glass-surface max-w-6xl w-full rounded-3xl p-8 md:p-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Rep Workspace
            </p>
            <h1 className="mt-1 text-3xl md:text-4xl font-semibold">
              Your AI-powered sales cockpit
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-300 max-w-2xl">
              Monitor your pipeline, launch campaigns, work leads, and quickly
              approve or edit AI-generated outreach before it goes out.
            </p>
          </div>
        </header>

        <Tabs defaultValue="overview">
          <TabsList className="mb-2 overflow-x-auto max-w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="activity">Activity log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewSection
              runningCampaigns={runningCampaigns}
              meetingsBooked={meetingsBooked}
              pendingApprovals={pendingApprovals}
              onCreateCampaign={() => {
                setShowCampaignForm(true);
              }}
            />
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignsSection
              campaigns={campaigns}
              onCreateNew={() => setShowCampaignForm(true)}
            />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsSection leads={leads} />
          </TabsContent>

          <TabsContent value="approvals">
            <ApprovalsSection
              approvals={approvals}
              onApprove={(id) =>
                setApprovals((prev) =>
                  prev.map((item) =>
                    item.id === id ? { ...item, status: "Approved" } : item
                  )
                )
              }
              onEdit={(item) => setEditingApproval(item)}
            />
          </TabsContent>

          <TabsContent value="activity">
            <AuditLogSection entries={auditLog} />
          </TabsContent>
        </Tabs>
      </section>

      {showCampaignForm && (
        <CampaignFormOverlay
          onClose={() => setShowCampaignForm(false)}
          onCreate={(campaign) => {
            setCampaigns((prev) => [
              {
                ...campaign,
                id: `cmp-${prev.length + 1}`,
                createdAt: new Date().toISOString().slice(0, 10)
              },
              ...prev
            ]);
            setShowCampaignForm(false);
          }}
        />
      )}

      {editingApproval && (
        <ApprovalEditOverlay
          item={editingApproval}
          onClose={() => setEditingApproval(null)}
          onSave={(updatedTitle) => {
            setApprovals((prev) =>
              prev.map((item) =>
                item.id === editingApproval.id
                  ? { ...item, title: updatedTitle, status: "Edited" }
                  : item
              )
            );
            setEditingApproval(null);
          }}
        />
      )}
    </main>
  );
}

function OverviewSection(props: {
  runningCampaigns: number;
  meetingsBooked: number;
  pendingApprovals: number;
  onCreateCampaign: () => void;
}) {
  const { runningCampaigns, meetingsBooked, pendingApprovals, onCreateCampaign } =
    props;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <OverviewCard
          label="Running campaigns"
          value={runningCampaigns}
          helper="Actively sending on your behalf"
        />
        <OverviewCard
          label="Meetings booked (today)"
          value={meetingsBooked}
          helper="From outbound and inbound"
        />
        <OverviewCard
          label="Items awaiting approval"
          value={pendingApprovals}
          helper="Review before your AI sends"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.3fr)]">
        <Card className="space-y-3">
          <CardHeader className="pb-1 flex items-center justify-between">
            <CardTitle className="text-sm">Today&apos;s focus</CardTitle>
            <Badge className="bg-cyan-400/15 text-[10px] text-cyan-200">
              AI suggestions
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Review and approve 2 high-priority outreach emails.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Follow up on 3 leads that opened your sequence twice.
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-violet-300" />
              Launch a focused campaign for trial signups this week.
            </li>
          </ul>
          </CardContent>
          <CardFooter className="border-t border-white/10 pt-3">
            <p className="text-[11px] text-slate-400">
              Knock these out to stay ahead of your AI queue.
            </p>
            <Button size="sm" onClick={onCreateCampaign}>
              Create new campaign
            </Button>
          </CardFooter>
        </Card>

        <Card className="space-y-3">
          <CardHeader className="pb-1 flex items-center justify-between">
            <CardTitle className="text-sm">Pipeline snapshot</CardTitle>
            <Badge variant="outline">Snapshot</Badge>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>Top-of-funnel leads</span>
              <span className="font-semibold text-white">36</span>
            </div>
            <div className="flex items-center justify-between">
              <span>In active sequences</span>
              <span className="font-semibold text-white">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Meetings this week</span>
              <span className="font-semibold text-white">7</span>
            </div>
          </CardContent>
          <div className="mx-4 mb-4 mt-1 h-1.5 w-auto rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-cyan-400 to-emerald-400" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function OverviewCard(props: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <Card className="p-5 space-y-2.5">
      <p className="text-sm text-slate-400">{props.label}</p>
      <p className="text-3xl font-semibold">{props.value}</p>
      <p className="text-xs text-slate-400">{props.helper}</p>
    </Card>
  );
}

function CampaignsSection(props: {
  campaigns: Campaign[];
  onCreateNew: () => void;
}) {
  const { campaigns, onCreateNew } = props;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Campaigns</h2>
          <p className="text-xs text-slate-300">
            Design and launch AI-assisted outbound and nurture programs.
          </p>
        </div>
        <Button onClick={onCreateNew} size="sm">
          New campaign
        </Button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Scheduled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="text-slate-50">{c.name}</TableCell>
                <TableCell className="text-slate-200">{c.channel}</TableCell>
                <TableCell className="text-slate-200">{c.owner}</TableCell>
                <TableCell>
                  <Badge>{c.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-300">
                  {c.createdAt}
                </TableCell>
                <TableCell className="text-slate-300">
                  {c.scheduledAt ?? "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function LeadsSection(props: { leads: Lead[] }) {
  const { leads } = props;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Leads</h2>
          <p className="text-xs text-slate-300">
            Prioritized list of people your AI Sales Agent is helping you work.
          </p>
        </div>
        <Input
          type="search"
          placeholder="Search by name, company, or email"
          className="w-full md:w-72"
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Last activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="text-slate-50">
                  <div className="flex flex-col">
                    <span>{l.name}</span>
                    <span className="text-[11px] text-slate-400">
                      {l.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-200">
                  {l.company}
                </TableCell>
                <TableCell className="text-slate-200">
                  {l.title}
                </TableCell>
                <TableCell className="text-slate-200">
                  {l.stage}
                </TableCell>
                <TableCell>
                  <Badge className="h-6 w-10 items-center justify-center bg-slate-800 text-[11px] text-slate-50">
                    {l.score}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300">
                  {l.lastActivity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ApprovalsSection(props: {
  approvals: ApprovalItem[];
  onApprove: (id: string) => void;
  onEdit: (item: ApprovalItem) => void;
}) {
  const { approvals, onApprove, onEdit } = props;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Approval queue</h2>
          <p className="text-xs text-slate-300">
            Review and approve AI-generated content before it is sent.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approvals.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-slate-50">
                  {item.title}
                </TableCell>
                <TableCell className="text-slate-200">
                  {item.type}
                </TableCell>
                <TableCell className="text-slate-200">
                  {item.campaign}
                </TableCell>
                <TableCell className="text-slate-200">
                  {item.owner}
                </TableCell>
                <TableCell>
                  <Badge>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-slate-300">
                  {item.submittedAt}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    className="bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                    onClick={() => onApprove(item.id)}
                    disabled={item.status !== "Pending"}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AuditLogSection(props: { entries: AuditLogEntry[] }) {
  const { entries } = props;
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Audit log</h2>
          <p className="text-xs text-slate-300">
            Single source of truth for what your AI and connected tools did, and
            when.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/40 p-3 md:p-4 max-h-[420px] overflow-y-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 rounded-2xl bg-slate-900/60 px-3 py-2"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-50">
                  {entry.actor}
                </span>
                <span className="text-xs text-slate-300">
                  {entry.action}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {entry.channel}
                </Badge>
              </div>
              <p className="text-xs text-slate-200">{entry.target}</p>
              {entry.meta && (
                <p className="text-[11px] text-slate-400">{entry.meta}</p>
              )}
            </div>
            <span className="text-[11px] text-slate-400 whitespace-nowrap md:pt-1">
              {entry.createdAt}
            </span>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-xs text-slate-400">
            Nothing here yet. Once your AI starts sending, syncing, and booking,
            every action will show up in this feed.
          </p>
        )}
      </div>
    </div>
  );
}

function CampaignFormOverlay(props: {
  onClose: () => void;
  onCreate: (campaign: Omit<Campaign, "id" | "createdAt">) => void;
}) {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<Campaign["channel"]>("Email");
  const [status, setStatus] = useState<CampaignStatus>("Draft");
  const [scheduledAt, setScheduledAt] = useState("");

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-end bg-black/40">
      <div className="h-full w-full max-w-md border-l border-white/10 bg-slate-950/95 p-6 space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">New campaign</h2>
            <p className="text-xs text-slate-300">
              Define a high-level shell; AI will help with copy and steps.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClose}
            className="rounded-full"
          >
            Close
          </Button>
        </header>

        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="text-slate-300">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q2 Outbound — PLG SaaS"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-300">Channel</label>
              <Select
                value={channel}
                onChange={(e) =>
                  setChannel(e.target.value as Campaign["channel"])
                }
              >
                <option value="Email">Email</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Multichannel">Multichannel</option>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-slate-300">Status</label>
              <Select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as CampaignStatus)
                }
              >
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Running">Running</option>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-slate-300">
              Scheduled start (optional)
            </label>
            <Input
              type="date"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-300">Brief for AI</label>
            <Textarea
              rows={3}
              placeholder="Describe your ICP, offer, and what a 'good' meeting looks like. The agent will use this to draft copy."
            />
          </div>
        </div>

        <footer className="flex items-center justify-between pt-3 border-t border-white/10">
          <p className="text-[11px] text-slate-400">
            This form is local-only for now. Later we&apos;ll POST to your
            backend.
          </p>
          <Button
            disabled={!name.trim()}
            onClick={() =>
              props.onCreate({
                name: name.trim(),
                owner: "You",
                channel,
                status,
                scheduledAt: scheduledAt || undefined
              })
            }
          >
            Create
          </Button>
        </footer>
      </div>
    </div>
  );
}

function ApprovalEditOverlay(props: {
  item: ApprovalItem;
  onClose: () => void;
  onSave: (updatedTitle: string) => void;
}) {
  const [title, setTitle] = useState(props.item.title);
  const [body, setBody] = useState(
    "Hi Alex,\n\nLoved your recent post about scaling outbound with a small team. We built AutoPilot to help exactly with that — it drafts personalized outreach across email and LinkedIn, then keeps your CRM spotless.\n\nWould you be open to a quick call next week?\n\nBest,\nYou"
  );

  return (
    <Dialog open onOpenChange={(open) => !open && props.onClose()}>
      <DialogHeader>
        <div>
          <DialogTitle>
            Edit & approve {props.item.type.toLowerCase()}
          </DialogTitle>
          <DialogDescription>
            Make quick tweaks before letting your AI send this out.
          </DialogDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={props.onClose}
          className="rounded-full"
        >
          Close
        </Button>
      </DialogHeader>

      <div className="space-y-3 text-xs">
        <div className="space-y-1">
          <label className="text-slate-300">Subject / title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-slate-300">Body</label>
          <Textarea
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="font-mono text-[11px]"
          />
        </div>
      </div>

      <DialogFooter>
        <p className="text-[11px] text-slate-400">
          In a real flow, clicking Approve would send this via Gmail /
          LinkedIn and log to HubSpot.
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-emerald-400 text-slate-900 hover:bg-emerald-300"
            onClick={() => {
              props.onSave(title.trim() || props.item.title);
            }}
          >
            Save & mark edited
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

