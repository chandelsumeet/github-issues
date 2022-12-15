import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";
import TableRowComponent from "./TableRowComponent";
const TableComponent = () => {
  const rows: any = [
    {
      url: "https://api.github.com/repos/facebook/react/issues/25889",
      repository_url: "https://api.github.com/repos/facebook/react",
      labels_url:
        "https://api.github.com/repos/facebook/react/issues/25889/labels{/name}",
      comments_url:
        "https://api.github.com/repos/facebook/react/issues/25889/comments",
      events_url:
        "https://api.github.com/repos/facebook/react/issues/25889/events",
      html_url: "https://github.com/facebook/react/issues/25889",
      id: 1498593254,
      node_id: "I_kwDOAJy2Ks5ZUrfm",
      number: 25889,
      title:
        "Bug: with Jest and Testing Library, React schedules work with wrong Jest timers functions",
      user: {
        login: "jsnajdr",
        id: 664258,
        node_id: "MDQ6VXNlcjY2NDI1OA==",
        avatar_url: "https://avatars.githubusercontent.com/u/664258?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/jsnajdr",
        html_url: "https://github.com/jsnajdr",
        followers_url: "https://api.github.com/users/jsnajdr/followers",
        following_url:
          "https://api.github.com/users/jsnajdr/following{/other_user}",
        gists_url: "https://api.github.com/users/jsnajdr/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/jsnajdr/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/jsnajdr/subscriptions",
        organizations_url: "https://api.github.com/users/jsnajdr/orgs",
        repos_url: "https://api.github.com/users/jsnajdr/repos",
        events_url: "https://api.github.com/users/jsnajdr/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/jsnajdr/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 155984160,
          node_id: "MDU6TGFiZWwxNTU5ODQxNjA=",
          url: "https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed",
          name: "Status: Unconfirmed",
          color: "d4c5f9",
          default: false,
          description:
            "A potential issue that we haven't yet confirmed as a bug",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 0,
      created_at: "2022-12-15T15:01:39Z",
      updated_at: "2022-12-15T17:01:11Z",
      closed_at: null,
      author_association: "NONE",
      active_lock_reason: null,
      body: '<!--\r\n  Please provide a clear and concise description of what the bug is. Include\r\n  screenshots if needed. Please test using the latest version of the relevant\r\n  React packages to make sure your issue has not already been fixed.\r\n-->\r\n\r\nReact version: 18.2.0\r\n\r\n## Steps To Reproduce\r\n\r\nHave a Jest setup that uses fake timers by default (the `fakeTimers: { enableGlobally: true }` config option), and then enable real timers for a specific test suite, like this:\r\n```jsx\r\nimport { screen, render } from "@testing-library/react";\r\nimport { useEffect, useState } from "react";\r\n\r\njest.useRealTimers();\r\n\r\nit("loads", async () => {\r\n  function App() {\r\n    const [data, setData] = useState(null);\r\n    useEffect(() => {\r\n      const t = setTimeout(() => {\r\n        setData("data");\r\n      }, 100);\r\n      return () => clearTimeout(t);\r\n    }, []);\r\n    return <div>{ data || "loading" }</div>;\r\n  }\r\n\r\n  render(<App />);\r\n\r\n  await screen.findByText("data");\r\n});\r\n```\r\nThis test renders an initial UI in "loading" state, then schedules a state update to "load data" in 100ms, and waits for the updated UI to appear, by calling `await findByText()`. This test is supposed to succeed.\r\n\r\nBut it fails. The state update scheduled in `setData` is never executed. That\'s because React schedules it using the fake timers version of `setImmediate`, but we want the real timers. Nobody is advancing the fake timers in our test, so they never run.\r\n\r\nThis timing bug is a combination of two factors: first, React statically initializes references to the timers functions, when loading the `react-dom` module:\r\n```js\r\nconst localSetImmediate = typeof setImmediate === \'function\' ? setImmediate : /* ... fallbacks */;\r\n```\r\nAt this time, fake timers are still active, the `jest.useRealTimers()` switch happens only later. The fake version is captured forever.\r\n\r\nSecond, the Testing Library\'s `waitFor` function (used by `findByText` internally) is [implemented](https://github.com/testing-library/dom-testing-library/blob/main/src/wait-for.js) in such a way that it disables the React Act environment while it\'s running (in the `getConfig().asyncWrapper` function). Then all the updates are not controlled by `act()`, but happen "naturally", using the native timers. Typically, in tests, updates would be wrapped in `act()` and timers are never called, but not here -- "`waitFor` + real timers" is different.\r\n\r\nThe same issue is in the `scheduleMicrotask` function that uses the fake version of `queueMicrotask`. This is used to schedule updates in `useSyncExternalStore`. This is how I originally discovered this bug: by debugging a custom `useSyncExternalStore`-using hook.\r\n\r\nOne solution would be to always look at the current value of `globalThis.setImmediate` or `globalThis.queueMicrotask`, like:\r\n```js\r\nconst localSetImmediate = typeof setImmediate === \'function\' ? (cb) => setImmediate(cb) : /* ... fallbacks */;\r\n```\r\n\r\nI\'m linking to a minimalistic GitHub repo that demonstrates the bug.\r\n\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn\'t\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example: https://github.com/jsnajdr/react-timers-bug\r\n',
      closed_by: null,
      reactions: {
        url: "https://api.github.com/repos/facebook/react/issues/25889/reactions",
        total_count: 4,
        "+1": 4,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
      timeline_url:
        "https://api.github.com/repos/facebook/react/issues/25889/timeline",
      performed_via_github_app: null,
      state_reason: null,
    },
    {
      url: "https://api.github.com/repos/facebook/react/issues/25887",
      repository_url: "https://api.github.com/repos/facebook/react",
      labels_url:
        "https://api.github.com/repos/facebook/react/issues/25887/labels{/name}",
      comments_url:
        "https://api.github.com/repos/facebook/react/issues/25887/comments",
      events_url:
        "https://api.github.com/repos/facebook/react/issues/25887/events",
      html_url: "https://github.com/facebook/react/issues/25887",
      id: 1498144466,
      node_id: "I_kwDOAJy2Ks5ZS97S",
      number: 25887,
      title:
        "Bug: Unnecessary `submit` event of form occurs across re-rendering",
      user: {
        login: "yukiyokotani",
        id: 26348105,
        node_id: "MDQ6VXNlcjI2MzQ4MTA1",
        avatar_url: "https://avatars.githubusercontent.com/u/26348105?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/yukiyokotani",
        html_url: "https://github.com/yukiyokotani",
        followers_url: "https://api.github.com/users/yukiyokotani/followers",
        following_url:
          "https://api.github.com/users/yukiyokotani/following{/other_user}",
        gists_url: "https://api.github.com/users/yukiyokotani/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/yukiyokotani/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/yukiyokotani/subscriptions",
        organizations_url: "https://api.github.com/users/yukiyokotani/orgs",
        repos_url: "https://api.github.com/users/yukiyokotani/repos",
        events_url:
          "https://api.github.com/users/yukiyokotani/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/yukiyokotani/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 155984160,
          node_id: "MDU6TGFiZWwxNTU5ODQxNjA=",
          url: "https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed",
          name: "Status: Unconfirmed",
          color: "d4c5f9",
          default: false,
          description:
            "A potential issue that we haven't yet confirmed as a bug",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 0,
      created_at: "2022-12-15T10:06:12Z",
      updated_at: "2022-12-15T11:18:18Z",
      closed_at: null,
      author_association: "NONE",
      active_lock_reason: null,
      body: 'When a state update causes the form\'s submit button to be displayed, the form\'s submit event fires even though the submit button has not been pressed.\r\n\r\nReact version: 18.2\r\n\r\n## Steps To Reproduce\r\n\r\n1. Press the "Change Mode" button on the first linked sample.\r\n2. Checking the console, you can see the `submit` event is fired.\r\n\r\nLink to code example:\r\n\r\nhttps://codesandbox.io/embed/friendly-alex-ehlut4?fontsize=14&hidenavigation=1&theme=dark\r\n\r\nIn the above sample, if the submit button is enclosed in `<div>`, this does not happen. Therefore, this phenomenon seems to be a bug related to React\'s re-rendering.\r\n\r\nhttps://codesandbox.io/embed/cocky-frost-fwd7vm?fontsize=14&hidenavigation=1&theme=dark\r\n\r\n## The current behavior\r\n\r\nWhen the "Change Mode" button is pressed while in mode A, the `changeMode` handler for the `click` event is executed, and after being re-rendered in mode B, the `submit` event fires with the "Submit" button as the submitter.\r\n\r\n## The expected behavior\r\n\r\nWhen the Change Mode button is pressed while in mode A, only `changeMode`, the handler of the `click` event, is executed.',
      closed_by: null,
      reactions: {
        url: "https://api.github.com/repos/facebook/react/issues/25887/reactions",
        total_count: 0,
        "+1": 0,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
      timeline_url:
        "https://api.github.com/repos/facebook/react/issues/25887/timeline",
      performed_via_github_app: null,
      state_reason: null,
    },
    {
      url: "https://api.github.com/repos/facebook/react/issues/25742",
      repository_url: "https://api.github.com/repos/facebook/react",
      labels_url:
        "https://api.github.com/repos/facebook/react/issues/25742/labels{/name}",
      comments_url:
        "https://api.github.com/repos/facebook/react/issues/25742/comments",
      events_url:
        "https://api.github.com/repos/facebook/react/issues/25742/events",
      html_url: "https://github.com/facebook/react/issues/25742",
      id: 1464495517,
      node_id: "I_kwDOAJy2Ks5XSm2d",
      number: 25742,
      title: "Add Async Stack Tagging API support",
      user: {
        login: "Jack-Works",
        id: 5390719,
        node_id: "MDQ6VXNlcjUzOTA3MTk=",
        avatar_url: "https://avatars.githubusercontent.com/u/5390719?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/Jack-Works",
        html_url: "https://github.com/Jack-Works",
        followers_url: "https://api.github.com/users/Jack-Works/followers",
        following_url:
          "https://api.github.com/users/Jack-Works/following{/other_user}",
        gists_url: "https://api.github.com/users/Jack-Works/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/Jack-Works/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/Jack-Works/subscriptions",
        organizations_url: "https://api.github.com/users/Jack-Works/orgs",
        repos_url: "https://api.github.com/users/Jack-Works/repos",
        events_url: "https://api.github.com/users/Jack-Works/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/Jack-Works/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 155984160,
          node_id: "MDU6TGFiZWwxNTU5ODQxNjA=",
          url: "https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed",
          name: "Status: Unconfirmed",
          color: "d4c5f9",
          default: false,
          description:
            "A potential issue that we haven't yet confirmed as a bug",
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 1,
      created_at: "2022-11-25T12:40:50Z",
      updated_at: "2022-11-26T14:21:24Z",
      closed_at: null,
      author_association: "CONTRIBUTOR",
      active_lock_reason: null,
      body: "Chrome recently shipped Async Stack Tagging API that can significantly improve the debug stack.\r\n\r\nAngular is already using it. See https://developer.chrome.com/blog/devtools-better-angular-debugging/#the-async-stack-tagging-api\r\n\r\n![image](https://user-images.githubusercontent.com/5390719/203987734-1a614251-9a9a-4330-98cd-bca9ea524fba.png)\r\n\r\nSince React is using time slicing to split the task, it is not convenient to debug why the update is triggered. If React supports Async Stack Tagging API, it will be much easier to find out why an update is triggered.",
      closed_by: null,
      reactions: {
        url: "https://api.github.com/repos/facebook/react/issues/25742/reactions",
        total_count: 1,
        "+1": 0,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 1,
      },
      timeline_url:
        "https://api.github.com/repos/facebook/react/issues/25742/timeline",
      performed_via_github_app: null,
      state_reason: null,
    },
    {
      url: "https://api.github.com/repos/facebook/react/issues/25655",
      repository_url: "https://api.github.com/repos/facebook/react",
      labels_url:
        "https://api.github.com/repos/facebook/react/issues/25655/labels{/name}",
      comments_url:
        "https://api.github.com/repos/facebook/react/issues/25655/comments",
      events_url:
        "https://api.github.com/repos/facebook/react/issues/25655/events",
      html_url: "https://github.com/facebook/react/issues/25655",
      id: 1442438668,
      node_id: "I_kwDOAJy2Ks5V-d4M",
      number: 25655,
      title: "Bug: ",
      user: {
        login: "mn-huda",
        id: 39855877,
        node_id: "MDQ6VXNlcjM5ODU1ODc3",
        avatar_url: "https://avatars.githubusercontent.com/u/39855877?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/mn-huda",
        html_url: "https://github.com/mn-huda",
        followers_url: "https://api.github.com/users/mn-huda/followers",
        following_url:
          "https://api.github.com/users/mn-huda/following{/other_user}",
        gists_url: "https://api.github.com/users/mn-huda/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/mn-huda/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/mn-huda/subscriptions",
        organizations_url: "https://api.github.com/users/mn-huda/orgs",
        repos_url: "https://api.github.com/users/mn-huda/repos",
        events_url: "https://api.github.com/users/mn-huda/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/mn-huda/received_events",
        type: "User",
        site_admin: false,
      },
      labels: [
        {
          id: 40929151,
          node_id: "MDU6TGFiZWw0MDkyOTE1MQ==",
          url: "https://api.github.com/repos/facebook/react/labels/Type:%20Bug",
          name: "Type: Bug",
          color: "b60205",
          default: false,
          description: null,
        },
        {
          id: 155984160,
          node_id: "MDU6TGFiZWwxNTU5ODQxNjA=",
          url: "https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed",
          name: "Status: Unconfirmed",
          color: "d4c5f9",
          default: false,
          description:
            "A potential issue that we haven't yet confirmed as a bug",
        },
        {
          id: 710332294,
          node_id: "MDU6TGFiZWw3MTAzMzIyOTQ=",
          url: "https://api.github.com/repos/facebook/react/labels/Component:%20Server%20Rendering",
          name: "Component: Server Rendering",
          color: "d4c5f9",
          default: false,
          description: null,
        },
      ],
      state: "open",
      locked: false,
      assignee: null,
      assignees: [],
      milestone: null,
      comments: 0,
      created_at: "2022-11-09T16:59:59Z",
      updated_at: "2022-11-09T16:59:59Z",
      closed_at: null,
      author_association: "NONE",
      active_lock_reason: null,
      body: "React version: 18.2.0\r\n\r\n## Steps To Reproduce\r\n\r\n1. Use React Router for Routing\r\n2. Use Firebase Authentication for User Account Management\r\n3. Construct a context with `CreateContext` on ROOT LAYOUT (the React Component I am using as a frame to render child components in different routes) for User Logged In Status\r\n4. Create state with useState hook in the same ROOT LAYOUT as `{loading: true, user: null}` initial value.\r\n5. Use useEffect hook to call `onAuthStateChanged` function from \"firebase/auth\" to call setState for new user state.\r\n6. Pass the user state as context provider's value [`<LoggedInContext.Provider value={userState}`].\r\n7. Subscribe to `LoggedInContext` in 'login', 'logout' and 'register' route using `useContext `hook.\r\n8.  Program /login route as if user is logged in, it will redirect to /profile route which also subscribes to `LoggedInContext` using `useContext` hook.\r\n9. In same /login route, if no user is logged in, it will not redirect and show a login form.\r\n10. When user is logged in [`{loading: false, user: {some user object}`], user can try to reach to the /logout route using browser's address bar.\r\n11. If user is logged out successfully, it will redirect the page to /login route using `<Navigate/>` component from \"react-router-dom\"\r\n12. Instead of showing login form on /login route, the state/context is not changed, user object remains inside the context and thus it is causing a redirect to the /profile route.\r\n13. In the console, Error is logged as: `Warning: React has detected a change in the order of Hooks called by Logout. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks`\r\n\r\n<!--\r\n  Your bug will get fixed much faster if we can run your code and it doesn't\r\n  have dependencies other than React. Issues without reproduction steps or\r\n  code examples may be immediately closed as not actionable.\r\n-->\r\n\r\nLink to code example:\r\n\r\n<!--\r\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\r\n  repository on GitHub, or provide a minimal code example that reproduces the\r\n  problem. You may provide a screenshot of the application if you think it is\r\n  relevant to your bug report. Here are some tips for providing a minimal\r\n  example: https://stackoverflow.com/help/mcve.\r\n-->\r\n\r\n## The current behavior\r\n[Bug_Report.zip](https://github.com/facebook/react/files/9973324/Bug_Report.zip)\r\n[localhost-1668013038675.log](https://github.com/facebook/react/files/9973361/localhost-1668013038675.log)\r\n![Web capture_9-11-2022_225813_localhost](https://user-images.githubusercontent.com/39855877/200893223-6895f7a9-36ec-414e-8479-00e796cfd6b1.jpeg)\r\n\r\n## The expected behavior\r\n![Web capture_9-11-2022_225848_localhost](https://user-images.githubusercontent.com/39855877/200893280-1165eb70-c227-486b-a133-6d299d752c9b.jpeg)\r\n",
      closed_by: null,
      reactions: {
        url: "https://api.github.com/repos/facebook/react/issues/25655/reactions",
        total_count: 0,
        "+1": 0,
        "-1": 0,
        laugh: 0,
        hooray: 0,
        confused: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
      timeline_url:
        "https://api.github.com/repos/facebook/react/issues/25655/timeline",
      performed_via_github_app: null,
      state_reason: null,
    },
  ];
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead></TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRowComponent key={index} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
