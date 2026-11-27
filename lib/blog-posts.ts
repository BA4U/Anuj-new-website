/** Blog posts. Add new posts at the top of the array. */
export type Block = ["h", string] | ["p", string] | ["ul", string[]];
export type Post = {
  slug: string;
  oldSlug?: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  cover: string;
  blocks: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "how-to-grow-instagram-go-viral-2026",
    date: "2026-11-20",
    category: "Instagram & Short-Form",
    readTime: "7 min read",
    cover: "/blog/instagram-viral-growth.jpg",
    title: "How to Grow on Instagram & Go Viral in 2026/2027: The Complete Retention & DM Funnel Playbook",
    excerpt:
      "Forget the outdated advice of posting 3x a day and praying for the explore page. In 2026/2027, Instagram's algorithm prioritizes watch-through rate, shares-per-reach, and automated DM keyword funnels. Here is the exact blueprint to engineer viral Reels and turn views into loyal followers and client pipeline.",
    blocks: [
      [
        "p",
        "Instagram in 2026 is an entirely different battleground than it was two years ago. The days of gaming reach with trending audio dances or stacking 30 hashtags are officially dead. Today, Meta’s recommendation engine operates on one ruthless principle: Audience Retention Velocity and Shareability."
      ],
      [
        "p",
        "If viewers swipe past in the first 2 seconds, your Reel is buried. But if they watch to the 80% mark and send it to a friend's DMs, Instagram pushes it to tens of thousands of non-followers within hours. Here is the exact operational playbook I use to build viral momentum for creators and brands."
      ],
      [
        "h",
        "1. The 2026 Algorithm Metric Hierarchy: What Actually Triggers Viral Reach"
      ],
      [
        "p",
        "Most creators obsess over likes. Instagram’s engineering team does not. The internal scoring algorithm ranks signals in this specific priority order:"
      ],
      [
        "ul",
        [
          "1. Shares via DM: When a user taps 'Share' and sends your Reel to a friend, Instagram flags your content as high-value human connection. 1 DM share is worth more than 20 likes.",
          "2. Watch-Through & Loop Rate: Completing an 18-second video (or looping it 1.2x) tells the AI that the pacing was airtight.",
          "3. Saves / Bookmarks: Indicates reference value, tutorial utility, or resource authority.",
          "4. Comments with Substantive Conversation: Threads of 3+ replies trigger algorithm distribution boosts.",
          "5. Likes: The weakest signal in the algorithm today."
        ]
      ],
      [
        "h",
        "2. The 3-Second Hook Matrix: How to Stop the Infinite Scroll"
      ],
      [
        "p",
        "Your hook must accomplish three things simultaneously in under 90 frames: visual interrupt, curiosity gap, and clear payoff promise. Here are the three formulas consistently breaking 100K views:"
      ],
      [
        "ul",
        [
          "The 'Opposite Day' Hook: Challenge conventional wisdom immediately. Example: 'Stop using Premiere Pro to edit your video reels in 2026. Here is why.'",
          "The 'Specific Proof' Hook: Open with the exact outcome before showing the steps. Example: 'This 12-second Reel generated 42 booked discovery calls with zero ad spend.'",
          "The 'Curiosity Anchor' Hook: Pair a high-contrast physical motion or screen capture with a bold headline text box placed in the top third of the 9:16 frame."
        ]
      ],
      [
        "p",
        "Pro Tip: Never let the speaker say 'Hey guys' or introduce themselves. Start mid-sentence on the core insight. The first frame must already contain kinetic movement."
      ],
      [
        "h",
        "3. The 'Trial Reel' Testing Framework"
      ],
      [
        "p",
        "In 2026, smart video editors don’t gamble on one cut. For every core message, I test three distinct 3-second hook variations with the same body and call-to-action. I publish the first version. If retention drops below 60% in the first 3 seconds, I re-package the hook and test variation B 48 hours later. 8 times out of 10, changing just the first 3 seconds turns a 2,000-view flop into a 250,000-view hit."
      ],
      [
        "h",
        "4. The Automated DM Funnel: Turning Viral Views into Real Revenue"
      ],
      [
        "p",
        "Going viral without a conversion engine is vanity. Every single high-performing Reel should incorporate an automated DM trigger word. Here is the architecture:"
      ],
      [
        "ul",
        [
          "1. Give Away Real Value: In the Reel, break down 80% of the strategy, then offer the complete resource (e.g. 'Comment PLAYBOOK below').",
          "2. Automated Instant DM: Within 3 seconds of commenting, ManyChat or automated webhook delivers the Notion doc or PDF link directly into their Instagram DM.",
          "3. Conversational Bridge: The automation asks a qualifying question: 'Are you currently creating video for your personal brand or a B2B business?'",
          "4. High-Ticket Booking: Qualified prospects are invited to book a 1-on-1 strategy call."
        ]
      ],
      [
        "p",
        "Result: A single viral Reel with 150K views routinely generates 800+ DM opt-ins, 350+ new email subscribers, and $15,000 to $30,000 in booked client pipeline."
      ],
      [
        "h",
        "5. The 2026 Video Pacing Standard: B-Roll & SFX Discipline"
      ],
      [
        "p",
        "Attention spans in 2026 require visual stimulation every 2.5 to 3.5 seconds. That does not mean dizzying chaotic zooms—it means intentional visual support: tactile sound effects on text pop-ups, subtle screen punch-ins on key words, and high-res screen recordings instead of generic stock footage."
      ]
    ]
  },
  {
    slug: "best-video-editing-software-2026-claude-ai",
    date: "2026-11-22",
    category: "AI & Video Technology",
    readTime: "8 min read",
    cover: "/blog/claude-ai-video-editing.jpg",
    title: "The Best Video Editing Software in 2026 Isn’t Premiere Pro or DaVinci—It’s Claude",
    excerpt:
      "Every traditional video editor is fighting a losing battle against timeline fatigue. In 2026, top-tier video operators don't spend 12 hours manually trimming silence in Premiere Pro. They use Claude to script retention frameworks, generate XML cutlists, automate scene switches, and engineer high-CTR packaging.",
    blocks: [
      [
        "p",
        "If you ask an editor in 2020 what their primary software was, they would answer Adobe Premiere Pro, Final Cut Pro, or DaVinci Resolve. In 2026, if you ask an elite growth partner who produces millions of views per month, the real answer is Claude."
      ],
      [
        "p",
        "This sounds provocative until you understand what modern video editing actually is. Video editing has never been about moving clips left and right on a magnetic timeline. Video editing is narrative psychology, hook engineering, pacing velocity, and audience retention optimization. Traditional NLEs are merely rendering engines; Claude is the cognitive brain."
      ],
      [
        "h",
        "1. The Death of Timeline Fatigue"
      ],
      [
        "p",
        "The most exhausting part of video production has always been the rough cut: listening to a 60-minute raw interview, hunting for timestamps, removing 'um's and false starts, and guessing which tangent will lose the audience. An editor spending 8 hours on manual slicing has zero creative energy left for sound design, hook packaging, or color grading."
      ],
      [
        "p",
        "In 2026, the modern operator exports the audio transcript and feeds it directly into Claude 3.7 with custom prompt frameworks. In 15 seconds, Claude:"
      ],
      [
        "ul",
        [
          "Identifies the core 3 story arcs that deliver the maximum emotional or informational payoff.",
          "Cuts 40% of repetitive rambling while preserving the speaker's natural vocabulary and tone.",
          "Generates an exact timestamped cutlist and selects the most potent quote for the first 5-second cold open hook.",
          "Flags every moment where pacing slows down and specifies exactly what B-roll or motion graphic should be inserted."
        ]
      ],
      [
        "h",
        "2. Automated XML & Python Timeline Generation"
      ],
      [
        "p",
        "Here is the secret weapon: Claude doesn't just write text; it writes code that directly builds video timelines. With DaVinci Resolve’s Python API and Premiere Pro’s ExtendScript, Claude generates complete XML / FCPXML timelines."
      ],
      [
        "p",
        "You supply the transcript with timestamps; Claude outputs an XML file. You import that XML into DaVinci Resolve or Premiere, and your entire multi-camera rough cut is already sliced, synchronized, color-coded, and arranged on the timeline without touching a razor tool."
      ],
      [
        "p",
        "Pro Tip: Using Claude-generated Python scripts for DaVinci Resolve, I can auto-detect speaker audio levels and automatically cut between Camera A and Camera B during a two-person podcast in under 3 minutes."
      ],
      [
        "h",
        "3. The Viral Hook Variation Engine"
      ],
      [
        "p",
        "A video's success is 70% packaging and 30% execution. Before opening an editing suite, I use Claude to stress-test 15 headline concepts and 10 video hook openings based on historical YouTube Studio retention data. Claude evaluates which hook creates the strongest curiosity gap without veering into deceptive clickbait."
      ],
      [
        "h",
        "4. The 2026 Hybrid Editing Stack"
      ],
      [
        "p",
        "Does this mean Premiere Pro and DaVinci Resolve are dead? No. It means their role has shifted from primary workspace to final finishing room. The 2026 modern production stack looks like this:"
      ],
      [
        "ul",
        [
          "Claude 3.7: The Brain — Scripting, cut-list generation, retention drop-off diagnosis, title/thumbnail A/B testing, and Python workflow scripts.",
          "Descript: The Text-Based Cutter — Initial transcript sync, automated filler word elimination, and Studio Sound speech mastering.",
          "DaVinci Resolve Studio: The Finishing Suite — Final XML assembly, high-end color grading, tactile motion curves, and master audio export."
        ]
      ],
      [
        "p",
        "Result: Client turnaround time dropped from 5 business days to 24-48 hours, while viewer retention averages increased by +38% across client channels."
      ]
    ]
  },
  {
    slug: "podcast-editing-workflow-descript-viral",
    date: "2026-11-24",
    category: "Podcast & Omnichannel Production",
    readTime: "9 min read",
    cover: "/blog/podcast-descript-workflow.jpg",
    title: "The Viral Podcast Editing Blueprint: Why Descript Wins, Engaging Hooks, and 1-to-20 Omnichannel Repurposing",
    excerpt:
      "Most podcasts die after 10 episodes because the production workflow is an exhausting nightmare. Here is the institutional step-by-step blueprint: why Descript is the ultimate podcast editor, how to craft 15-second cold open hooks, multicam scene switching, audio mastering, and slicing 20+ viral short-form assets from a single recording.",
    blocks: [
      [
        "p",
        "90% of business podcasts never make it past episode 10. It’s not because the conversations are bad—it’s because the traditional production workflow is an exhausting, soul-crushing bottleneck. The founder records for an hour, sends the file to an editor, waits two weeks, gets a clunky 60-minute video with no chapters, uploads it, and gets 42 views."
      ],
      [
        "p",
        "In 2026, a podcast is not a video file you dump on YouTube. A podcast is an Omnichannel Content Machine. One 45-minute recording should fuel your entire media presence across YouTube, Spotify, Apple Podcasts, LinkedIn, Shorts, Instagram Reels, and TikTok for a whole month."
      ],
      [
        "h",
        "1. Why Descript is the Undisputed #1 Podcast Editor in 2026"
      ],
      [
        "p",
        "Traditional NLEs make podcast editing painful because speech is linear audio. Descript treats video like a Google Doc. You edit the video by editing the text. Here is why it completely dominates traditional editing for conversational content:"
      ],
      [
        "ul",
        [
          "Studio Sound AI: Cleans up background hiss, air conditioner rumble, and echo with a single slider. It makes a $100 USB mic sound like a $1,000 Shure SM7B in a treated booth.",
          "Automatic Filler Word Removal: Detects and removes all 'um's, 'uh's, 'like's, and prolonged dead air pauses across both speakers in 10 seconds.",
          "Multicam Auto-Switching: Descript transcribes both tracks and can automatically switch video angles based on who is actively speaking.",
          "Eye Contact Correction: Subtly adjusts the speaker's gaze toward the lens even if they were glancing at notes or a second monitor."
        ]
      ],
      [
        "h",
        "2. The 15-Second Cold Open: Never Start with 'Welcome Back'"
      ],
      [
        "p",
        "The fastest way to kill a YouTube podcast is starting with 45 seconds of intro music, logos, and 'Hey everyone, welcome back to episode 48, today my guest is...' Viewers click off before the guest says a single word."
      ],
      [
        "p",
        "The Cold Open Formula: Find the most shocking, counterintuitive, or emotionally charged 12 to 18-second soundbite from the middle of the interview. Place it at second 0:00. Cut to black on a cliffhanger, flash a 2-second minimalist logo bumper, and dive straight into the conversation."
      ],
      [
        "h",
        "3. Speaker Framing & Scene Switching Discipline"
      ],
      [
        "p",
        "A static split-screen view for 45 minutes puts audiences to sleep. Modern viewer retention requires visual rhythm:"
      ],
      [
        "ul",
        [
          "Dynamic Solo Framing: When the guest is answering a deep question, cut to a dedicated close-up solo shot. Do not keep the host on screen nodding silently for 2 minutes.",
          "The 4-Second Reaction Cut: Cut back to the host only when they react with genuine surprise, laughter, or a sharp follow-up question.",
          "Split-Screen Only for Dialogues: Reserve 50/50 split views for fast-paced banter or debate points."
        ]
      ],
      [
        "h",
        "4. Mastering Audio to Broadcast Loudness Standards"
      ],
      [
        "p",
        "People will forgive average 1080p video, but they will instantly abandon a podcast with bad audio. Ensure your final render matches platform target loudness:"
      ],
      [
        "ul",
        [
          "Spotify & Apple Podcasts Target: -16 LUFS (integrated) with a true peak ceiling of -1.0 dB.",
          "YouTube Video Target: -14 LUFS with dialogue leveled between -12 dB and -6 dB.",
          "Voice EQ: High-pass filter at 80Hz to eliminate mic stand thumps, gentle dip at 400Hz to remove boxiness, and a subtle +2 dB boost at 3kHz for vocal presence."
        ]
      ],
      [
        "h",
        "5. The 1-to-20 Omnichannel Machine: What to Slice From Every Episode"
      ],
      [
        "p",
        "Once the master episode is locked, my production engine extracts 20+ distinct assets:"
      ],
      [
        "ul",
        [
          "1x Master Video Podcast: Timestamped chapters, custom lower-thirds, and SEO-optimized YouTube descriptions.",
          "1x Master Audio Podcast: Clean MP3 feed distributed to Spotify, Apple, and Amazon Music.",
          "5x Platform-Native Vertical Shorts / Reels: 9:16 aspect ratio, animated kinetic captions, hook sound effects, and color-graded clips.",
          "3x Executive LinkedIn Carousels: Repurposing the guest's 3 best framework takeaways into multi-slide PDF carousels.",
          "3x LinkedIn Thought-Leadership Text Posts: First-person storytelling posts capturing the key lesson.",
          "5x High-Contrast Quote Graphics: Quotable soundbites formatted for Twitter/X and Instagram stories.",
          "1x Newsletter Deep-Dive: A 500-word digest sent to the creator's email subscribers with YouTube embed."
        ]
      ],
      [
        "p",
        "Result: The host only spends 60 minutes recording in front of a mic once a month. I handle the entire engineering, editing, packaging, and distribution pipeline from there."
      ]
    ]
  }
];
