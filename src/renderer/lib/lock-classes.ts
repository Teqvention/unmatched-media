interface LockOptions {
  lockPadding?: boolean;
  lockHeight?: boolean;
  lockSize?: boolean;
}

const RE_PADDING = /^!?(p|px|py|pt|pr|pb|pl)-/;
const RE_HEIGHT = /^!?(h|min-h|max-h)-/;
const RE_SIZE = /^!?size-/;

const tokenRegex = /\s+/;

function tokenTail(t: string) {
  // handles: "md:hover:!pt-2" -> "!pt-2"
  const parts = t.split(":");
  return parts.at(-1) ?? t;
}

export function lockTailwindClasses(
  className: string | undefined,
  { lockPadding = true, lockHeight = true, lockSize = false }: LockOptions = {}
) {
  if (!className) {
    return "";
  }

  const tokens = className.trim().split(tokenRegex);

  const kept = tokens.filter((t) => {
    const tail = tokenTail(t);

    if (lockPadding && RE_PADDING.test(tail)) {
      return false;
    }
    if (lockHeight && RE_HEIGHT.test(tail)) {
      return false;
    }
    if (lockSize && RE_SIZE.test(tail)) {
      return false;
    }

    return true;
  });

  return kept.join(" ");
}
