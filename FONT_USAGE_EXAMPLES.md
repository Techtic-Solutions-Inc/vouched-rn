# How to Use Custom Fonts in Your App

## Available Fonts

- **Inter-Regular** - Regular weight
- **Inter-Medium** - Medium weight
- **Inter-Bold** - Bold weight
- **Inter-ExtraBold** - Extra bold weight
- **Inter-Black** - Black weight

## Method 1: Using the Hook (Recommended)

```tsx
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFontFamily } from "@/hooks/use-fonts";

const MyComponent = () => {
  const fonts = useFontFamily();

  return (
    <View>
      <Text style={[styles.text, { fontFamily: fonts.regular }]}>
        Regular Text
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.medium }]}>
        Medium Text
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.bold }]}>Bold Text</Text>
      <Text style={[styles.text, { fontFamily: fonts.extraBold }]}>
        Extra Bold Text
      </Text>
      <Text style={[styles.text, { fontFamily: fonts.black }]}>Black Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
```

## Method 2: Direct Import from Constants

```tsx
import React from "react";
import { Text, StyleSheet } from "react-native";
import fonts from "@/constants/fonts";

const MyComponent = () => {
  return (
    <Text style={[styles.text, { fontFamily: fonts.Regular }]}>
      Regular Text
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
```

## Method 3: In StyleSheet

```tsx
import React from "react";
import { Text, StyleSheet } from "react-native";
import fonts from "@/constants/fonts";

const MyComponent = () => {
  return <Text style={styles.title}>Title Text</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: fonts.Bold,
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: fonts.Medium,
    color: "#666",
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: "#333",
  },
});
```

## Method 4: Combining with fontSize Constants

```tsx
import React from "react";
import { Text, StyleSheet } from "react-native";
import fonts from "@/constants/fonts";
import { fontSize } from "@/constants/fontSize";

const MyComponent = () => {
  return <Text style={styles.heading}>Large Heading</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: fontSize.extraLarge,
    fontFamily: fonts.Bold,
  },
});
```

## Example: Updating TextInput Component

```tsx
import fonts from "@/constants/fonts";

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: fonts.Medium, // Instead of fontWeight
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    // ... other styles
  },
});
```

## Important Notes:

1. **Don't use `fontWeight` with custom fonts** - Use `fontFamily` instead
2. **Font names must match exactly** - Use the exact names from `fonts.ts`
3. **Fonts load asynchronously** - The app waits for fonts to load before rendering
4. **Fallback behavior** - If font fails to load, React Native will use system default

## Common Patterns:

### Heading Styles

```tsx
const headingStyles = {
  h1: { fontSize: 32, fontFamily: fonts.Bold },
  h2: { fontSize: 24, fontFamily: fonts.Bold },
  h3: { fontSize: 20, fontFamily: fonts.Medium },
};
```

### Body Text

```tsx
const bodyStyles = {
  regular: { fontSize: 16, fontFamily: fonts.Regular },
  medium: { fontSize: 16, fontFamily: fonts.Medium },
  bold: { fontSize: 16, fontFamily: fonts.Bold },
};
```
