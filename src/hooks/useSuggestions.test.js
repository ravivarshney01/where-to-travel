import { act, renderHook } from "@testing-library/react-hooks";
import useSuggestions from "./useSuggestions";

const data = [
  "Amsterdam",
  "Agra",
  "Abu Dhabi",
  "Auckland",
  "Cairo",
  "Christchurch",
  "Chennai",
  "Chiang Mai",
  "Rome",
  "Vienna",
];

test("should use suggestions", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  expect(typeof refreshSuggestions).toBe("function");
});

test("should give 4 suggestions", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  act(() => refreshSuggestions("a"));
  expect(result.current[0].length).toBe(4);
});

test("3rd suggestion should be Chennai", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  act(() => refreshSuggestions("c"));
  expect(result.current[0][2]).toBe("Chennai");
});

test("should give 0 suggestions if query is empty", () => {
  const { result } = renderHook(() => useSuggestions(data));
  let [suggestions, refreshSuggestions] = result.current;
  expect(suggestions.length).toBe(0);
  act(() => refreshSuggestions(""));
  expect(result.current[0].length).toBe(0);
});
