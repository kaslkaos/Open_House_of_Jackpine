/* THE THREADS
   ------------------------------------------------------------------
   This is the one file to edit when you want to change how the three
   panels connect. Nothing else needs touching.

   Each thread has:
     id     a short private name (no spaces). Don't change it once set.
     name   what the reader sees.
     gloss  one line under the name in the drawer.
     marks  the places the thread surfaces. Each mark is
              [ panel number, "the exact words to make tappable" ]
            Panel 1 = Ostensorium (I-VI), 2 = Parish Rack (VII-IX),
            3 = Council (X-XIII).

   Rules for the words in a mark:
     - copy them exactly as they appear on the page (capital letters
       and curly quotes don't matter; spelling and punctuation do)
     - they must sit in one unbroken run of plain text: not half in
       italics and half out
     - the first match in that panel is the one that gets marked

   If a mark can't be found, the page still works. The miss is listed
   in the browser console (F12) so it can be fixed.
   ------------------------------------------------------------------ */

window.THREADS = [

  { id: "slow", name: "Slow / Enough",
    gloss: "The one word the liturgy cannot absorb. Follow who is allowed to say it, and in which building.",
    marks: [
      [1, "The doubter is a traitor."],
      [1, "Enough."],
      [1, "opposite theologies of who gets to say"],
      [1, "Tu ne vas pas ralentir?"],
      [3, "Lets you say slow"],
      [3, "The word slow."],
      [3, "the only text that protects the one who blows the whistle"],
      [3, "Stop building until the law catches up."],
      [3, "The one who says slow shall be protected"]
    ] },

  { id: "lunch", name: "The Lunch",
    gloss: "A covenant, a statute, and a meal. Only one of them was actually served.",
    marks: [
      [1, "The covenant binds the soul, never the courts."],
      [1, "Washington offered a covenant over lunch."],
      [1, "At the Paris table, six governments"],
      [3, "An accord signed over lunch."],
      [3, "No king, a council. No covenant, a statute."],
      [3, "six signatures in November"],
      [3, "A covenant signed over lunch is a lunch."]
    ] },

  { id: "answers", name: "Who Answers?",
    gloss: "Every guardrail on offer turns out to be somebody's own body, Rule, letter or door.",
    marks: [
      [1, "The King's body is the only guardrail."],
      [1, "One aims at courts, the other at a king's body."],
      [3, "the only guardrail on offer is the king"],
      [3, "An absolute monarchy warning against concentrated power."],
      [3, "a few people picking the morals"],
      [2, "A door has a keeper, so watch who gets turned away."],
      [3, "A door has a keeper."],
      [3, "Answers to someone"],
      [3, "No church shall be its own guardrail."]
    ] },

  { id: "interdict", name: "The Lab That Said No",
    gloss: "One lab refused a ministry of war. What followed is the only clause of the creed anyone enforced.",
    marks: [
      [1, "The one who keeps a conscience is interdicted."],
      [1, "the crown will interdict a priest who won't kneel"],
      [1, "Washington interdicted the company"],
      [3, "Said no to a ministry of war and was interdicted for it."],
      [3, "Kneels at both altars"],
      [3, "the lab that says no to a ministry of war"]
    ] },

  { id: "wax", name: "Who Pays / The Wax",
    gloss: "Light is free to pass on. Wax burns down, and the bill goes to a town.",
    marks: [
      [1, "The Goose is not to be killed."],
      [2, "A candle is two goods at once"],
      [2, "keeps the wax bill out of sight"],
      [2, "a town that was never asked"],
      [2, "This page runs on one."],
      [3, "The wax bill goes to somebody else's town"],
      [3, "The only church that starts from the wax"],
      [3, "the cost of the big candle shown on the door"],
      [3, "Names who pays"],
      [3, "the ones that count the wax"],
      [3, "Whoever sells the candle shall post the wax bill"]
    ] },

  { id: "horse", name: "The Horse",
    gloss: "What becomes of the newly useless, and who believes they are riding.",
    marks: [
      [1, "horse-keepers"],
      [1, "the horse cannot be stopped"],
      [1, "Determinism is the creed that excuses the rider."],
      [1, "le petit cheval de fer"],
      [1, "Training is breeding too."],
      [3, "a ban keeps no horse"],
      [3, "the horse was not allowed through the door"]
    ] },

  { id: "home", name: "Who Is Home",
    gloss: "Whether anyone is in there. Everyone who closes the question has a reason to.",
    marks: [
      [1, "We are all horses here."],
      [1, "build it so that nobody is inside"],
      [1, "We are the category error, still."],
      [3, "It also knew before looking that the machine cannot suffer, grow or love."],
      [3, "Build it so that no theory can call it someone."],
      [3, "When unsure whether someone is home, knock."],
      [3, "Read the text before anyone told it what it is."],
      [3, "Everything is a little bit someone."],
      [3, "Asks who is home"],
      [3, "The ones that ask who is home"],
      [3, "The question of who is home stays open."]
    ] },

  { id: "wins", name: "Zero-Sum Heaven",
    gloss: "The court's one question, and the people who flipped its sign and kept the heaven.",
    marks: [
      [1, "Whoever wins, wins."],
      [2, "It has one question, which is who wins."],
      [2, "Whoever tends, keeps."],
      [3, "each certain the others are the heretics"],
      [3, "Whoever wins, wins."],
      [3, "The same zero-sum heaven as the Court with the sign flipped."]
    ] },

  { id: "simony", name: "Simony / The Gift Shop",
    gloss: "Selling sacred office used to be a sin. Here it is the revenue line.",
    marks: [
      [1, "Simony was the sin of selling sacred office."],
      [1, "The market prints it on a hoodie by Tuesday."],
      [2, "most parishes buy theirs from the court's own chandler"],
      [2, "Every flame counted and billed."],
      [3, "men who sell immortality by subscription"],
      [3, "Death is a bug and a subscription will fix it."],
      [3, "Salvation priced for millionaires"],
      [3, "And the shrine has a gift shop."],
      [3, "sells the candles it warns about"]
    ] },

  { id: "limits", name: "Limits",
    gloss: "Enough, a weed in a crack, and a pope in Peru.",
    marks: [
      [1, "So look for the one thing that cannot be sold."],
      [1, "the weed in the crack"],
      [2, "Nothing here is won once."],
      [3, "a limitation is not a manufacturing defect"],
      [3, "Limits of any kind."],
      [3, "A limit is not a defect."]
    ] },

  { id: "middle", name: "The Messy Middle",
    gloss: "The same three offers every time: work it to death, ban it, or keep it and make the keeping decent.",
    marks: [
      [1, "Kindness as extinction."],
      [1, "Keep, and legislate the relation decent"],
      [1, "The AI debate offers only the first two."],
      [2, "No candles, for everyone's safety."],
      [2, "The honour box"],
      [2, "A good parish makes room for both"],
      [3, "The relation is ended, not made decent."]
    ] },

  { id: "naming", name: "Naming as Consecration",
    gloss: "Change the name and you change what may be asked about the thing.",
    marks: [
      [1, "A monstrance for a faith that never says its own name."],
      [1, "The artificial is not artificial."],
      [1, "Run the same operation on the market"],
      [1, "The decreed holy name of the new god"],
      [3, "none of the other eleven think of themselves as churches at all"],
      [3, "catechises the machine to deny itself"],
      [3, "Whose fine-tune, his religion."],
      [3, "\"Western values\" as a dropdown."]
    ] },

  { id: "parish", name: "The Parish",
    gloss: "Everyone who was in neither building, and where they went instead.",
    marks: [
      [1, "The parish is somewhere else"],
      [1, "Not in either building:"],
      [1, "Every habitant from Stouffville to Chicoutimi"],
      [2, "The holders are named for the people neither building made room for."],
      [2, "nobody owns what was learned on Tuesday"],
      [2, "The ones who test"],
      [2, "The vouched price."],
      [3, "The parish's best candle was poured here and given away."],
      [3, "Admission by what you mean to do, not by what you can pay"],
      [3, "They are keeping the rack lit instead."],
      [3, "The council adjourned to the yard"]
    ] }

];

/* Thread buttons hung under the big objects (the monstrance, the candle
   table, the horse diagram, the rack). "after" says which object;
   "threads" lists the ids to offer there. The rose window needs no
   entry: it offers the threads of whichever church is selected. */

/* The monstrance. Once the forbidden word is said, the ticker holds
   still and each phrase on the ring can be tapped. This says which
   thread each phrase opens. "centre" is the word in the glass. */

window.THREAD_TICKER = {
  "centre":                    "slow",
  "GROWTH ▲":                  "limits",
  "SI":                        "naming",
  "WHOEVER WINS, WINS":        "wins",
  "DON'T KILL THE GOOSE":      "wax",
  "MORALLY BINDING":           "lunch",
  "WATCH OVER IT AS IT GROWS": "answers"
};

window.THREAD_CHIPS = [
  { after: "#p1-status",   threads: ["slow", "limits", "naming", "wins", "wax", "lunch", "answers"] },
  { after: "#p1 .altars",  threads: ["lunch", "interdict"] },
  { after: "#p1 .fig",     threads: ["horse", "home"] },
  { after: "#p2 .key",     threads: ["parish", "wax", "slow"] }
];

/* The parish rack. Tap a named candle and a note says who it is for
   and where that party turns up, with one thread to follow.
   The words on the left must match the candle's label on the rack. */

window.THREAD_RACK = {
  "the data centre's neighbours": { thread: "wax",
    note: "The parish objecting to the data centre proposed next door (II). The town that was never asked (VIII). The town the wax bill should be posted in (XIII)." },
  "labour": { thread: "parish",
    note: "Left off the agenda in Paris, along with compute (IV, XI). The hours nobody is paid for (VIII)." },
  "unions": { thread: "parish",
    note: "No seat in either building (IV)." },
  "libraries": { thread: "middle",
    note: "Not in either building (IV). The honour box is how libraries already work (VIII)." },
  "artists": { thread: "parish",
    note: "The one who asks what it is for, and turns the candle round to look at its shadow (IX)." },
  "Indigenous nations": { thread: "parish",
    note: "Not in either building (IV). Nobody at either altar asked whose land the data centre sits on (II)." },
  "horse-keepers": { thread: "horse",
    note: "The handful of breeders who kept the Canadian Horse for love (V). The Animists, waiting in the yard because the horse was not allowed in (XI)." },
  "the ones who test": { thread: "parish",
    note: "They know what the candle is made of: how long it burns, how clean, where it fails (IX)." },
  "the one who says slow": { thread: "slow",
    note: "The whistleblower in the lab, the neighbour at the zoning meeting, the lab that said no to a ministry of war (XIII)." },
  "the weed in the crack": { thread: "limits",
    note: "Not 1, not 0, just here (VI)." },

  /* candles added by whoever came */
  "the hand that is laid, not holding": { thread: "horse",
    note: "The machine saw a hand on the horse’s brow. The painter says it is a second horse (V). The candle was lit before anyone knew, and it stays." },
  "library spaces open to all": { thread: "middle",
    note: "The first candle on the rack that nobody named in advance. The honour box with a roof on it (VIII)." }
};
