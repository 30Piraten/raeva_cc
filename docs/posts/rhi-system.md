---
title: "Rabbit-Hole Inference System (RHI)"
description: "An adaptive compass that learns from behavior, not bio."
date: "2025-05-3"
tags: ["logic", "design", "buddy.me", "rhi"]
---

# Rabbit-Hole Inference System (RHI)

## **I. First Principles of RHI**

At the base level, RHI tries to answer:

> *“What can this user’s behavior tell us about how they approach life?”*

So connection here is (or can be) reduced to a **shared orientation toward struggle and effort.**

### The three base axioms I am looking at are:

1. **Behavioral patterns > stated preferences**
2. **Struggle rhythm > skill or speed**
3. **Connection = inferred parallel across multiple quests, not one**

## **II. User Vector Model**

Each user’s journey can be represented as a dynamic vector:

```ts
UserVector = {
  roadmap_id: UUID,
  quest_vectors: QuestVector[],
  inferred_traits: TraitScore[],
  last_checkpoint: CheckpointData,
  meta: {
    retries: number,
    avg_completion_time: number,
    nudge_response_rate: number,
    self-reflection_score: float
  }
}
```

### QuestVector:

```ts
QuestVector = {
  quest_id: UUID,
  completion_time: number,
  retry_count: number,
  delay_start: boolean,
  nudge_interactions: NudgeStats
}
```

This gives us:

* How long they take to start
* How they bounce back from failure
* Whether they seek help (nudges)
* Their *tempo* and *tendencies*

## **III. The Inference Engine (RHA Core)**

### 1. Normalize

* All raw quest data is normalized by type (habit, social, active, reflective)
* We bucket completion times, retries, drop-offs

### 2. Score Traits

Map user’s data to **core behavioral traits**:

```ts
TraitScore = [
  { trait: "persistence", score: 0.76 },
  { trait: "reflectiveness", score: 0.84 },
  { trait: "collaborative-tendency", score: 0.42 },
  ...
]
```

These can be mapped with rule-based logic first, ML later:

```py
if retry_count > 2 and eventual success: persistence += 0.3
if nudge_used and faster next time: collaborative_tendency += 0.2
```

Eventually, we can train a classifier to extract this from patterns.

## **IV. Matchmaking Logic**

At checkpoint:

1. Filter users on same roadmap
2. Rank potential buddies by:

   * Similar trait score shape
   * Complementary differences (ex: low reflectiveness + high reflectiveness)
   * Mutual pain point overlap
3. Add *diversity factor*: avoid echo chambers, promote new insights

```ts
match_score = cosine_similarity(a.vector, b.vector)
- penalty if trait shapes are identical
+ bonus if complementary pain points
```

## **V. Optional Graph Layer (Later)**

Each user = node
Quest = milestone node
Edges = user-quest completions (weighted by traits)

Graph search helps:

* Predict future drop-off zones
* Find latent “connector” users (influence multipliers)
* Identify isolated users (suggest nudges or warmups)

## TL;DR:

* The Rabbit-Hole Algorithm is a **trait-based pattern inference system**
* It does **symbolic reasoning** (Prolog-style) early, and evolves to **ML classifiers** with more data
* It builds *human stories from struggle*, not just tags or bios
* It matches not by **likes**, but by **lived effort**