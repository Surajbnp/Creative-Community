"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CONVERSATIONS,
  CURRENT_USER,
  INITIAL_POSTS,
  NOTIFICATIONS,
} from "@/data/mock";

const STORAGE_KEY = "zura:app:v1";
const Ctx = createContext(null);

const initialState = {
  onboarded: false,
  user: null,
  // generic id lists: following, joined (communities/projects), saved (posts/gigs),
  // liked (posts), applied (gigs), rsvp (events)
  flags: { following: ["c1"], joined: ["cm1"], saved: [], liked: [], applied: [], rsvp: [] },
  posts: INITIAL_POSTS,
  conversations: CONVERSATIONS,
  notifications: NOTIFICATIONS,
};

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setState((s) => ({ ...s, ...saved, flags: { ...s.flags, ...saved.flags } }));
      }
    } catch {}
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const has = useCallback((list, id) => state.flags[list]?.includes(id), [state.flags]);

  const toggle = useCallback((list, id) => {
    setState((s) => {
      const cur = s.flags[list] || [];
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      return { ...s, flags: { ...s.flags, [list]: next } };
    });
  }, []);

  const add = useCallback((list, id) => {
    setState((s) => {
      const cur = s.flags[list] || [];
      if (cur.includes(id)) return s;
      return { ...s, flags: { ...s.flags, [list]: [...cur, id] } };
    });
  }, []);

  const completeOnboarding = useCallback(
    () => setState((s) => ({ ...s, onboarded: true })),
    []
  );

  const login = useCallback(
    (patch = {}) =>
      setState((s) => ({
        ...s,
        onboarded: true,
        user: { ...CURRENT_USER, ...patch },
      })),
    []
  );

  const logout = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  const updateUser = useCallback(
    (patch) => setState((s) => ({ ...s, user: { ...s.user, ...patch } })),
    []
  );

  const addPost = useCallback(({ text, tags = [], image }) => {
    setState((s) => ({
      ...s,
      posts: [
        {
          id: `post-${Date.now()}`,
          authorId: "me",
          time: "just now",
          text,
          images: image ? [image] : [],
          tags,
          likes: 0,
          commentBase: 0,
          comments: [],
        },
        ...s.posts,
      ],
    }));
  }, []);

  const addComment = useCallback((postId, text) => {
    setState((s) => ({
      ...s,
      posts: s.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `cm-${Date.now()}`, authorId: "me", text, time: "just now" },
              ],
            }
          : p
      ),
    }));
  }, []);

  const pushMessage = useCallback((convId, msg) => {
    setState((s) => ({
      ...s,
      conversations: s.conversations.map((c) =>
        c.id === convId
          ? {
              ...c,
              unread: msg.from === "them" ? c.unread + 1 : c.unread,
              messages: [...c.messages, { id: `${convId}-${Date.now()}`, time: "now", ...msg }],
            }
          : c
      ),
    }));
  }, []);

  const markConversationRead = useCallback((convId) => {
    setState((s) => ({
      ...s,
      conversations: s.conversations.map((c) => (c.id === convId ? { ...c, unread: 0 } : c)),
    }));
  }, []);

  const markNotificationsRead = useCallback(() => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      createOpen,
      setCreateOpen,
      has,
      toggle,
      add,
      completeOnboarding,
      login,
      logout,
      updateUser,
      addPost,
      addComment,
      pushMessage,
      markConversationRead,
      markNotificationsRead,
    }),
    [
      state, hydrated, createOpen, has, toggle, add, completeOnboarding, login, logout,
      updateUser, addPost, addComment, pushMessage, markConversationRead, markNotificationsRead,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used inside <AppProvider>");
  return v;
};
