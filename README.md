# nextjs-suspense

Run `npm install`, `npm run dev`, and then:

### Test 1

1. Hard reload page
1. Note how the item detail suspends (loading appears)

### Test 2

1. Update the request delay in `./layout.jsx` to match delay in `./item/[itemId]/page.jsx` (`500`)
1. Hard reload page
1. Note loading doesn't appear

### Summary

I'd like to be able to preload data higher up the tree to mimic Test 2 and avoid the spinnageddon that happens in Test 1, but in my real world version of this scenario the request depends on URL params for the nested page, and parent layouts cannot access these.

There was [this proposal](https://x.com/fredkisss/status/1784171488146338000) to use [catch-all segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments) but that feels like I'd need to reimplement route handling for the nested routes and would likely become hard to maintain.

The other option is to remove `loading.tsx` altogether but now route transitions hang without feedback, and there doesn't appear to be an ergonomic way to hook into `Link` transitions in order to display a loading indicator of my own.
