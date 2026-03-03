from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class ContestHistory:
    contest: str
    rating: float
    timestamp: int

@dataclass
class Badge:
    name: str
    icon: str

@dataclass
class PlatformStats:
    platform: str
    username: str
    current_rating: float | None
    max_rating: float | None
    rank_title: str | None
    contests: int | None
    history: List[ContestHistory] = field(default_factory=list)

@dataclass
class PlatformContribution:
    solved: int = 0
    contests: int = 0
    submissions: int = 0
    badges: List[Badge] = field(default_factory=list)
    difficulty: Dict[str, int] = field(default_factory=dict)
    cp_difficulty: Dict[str, int] = field(default_factory=dict)

@dataclass
class PlatformResult:
    stats: "PlatformStats"
    contrib: PlatformContribution

@dataclass
class GlobalStats:
    total_solved: int = 0
    total_dsa_solved: int = 0
    total_cp_solved: int = 0
    total_submissions: int = 0
    total_contests: int = 0
    badges: List[Badge] = field(default_factory=list)
    difficulty: Dict[str, int] = field(default_factory=dict)
    cp_difficulty: Dict[str, int] = field(default_factory=dict)