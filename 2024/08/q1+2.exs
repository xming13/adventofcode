defmodule Solution do
  # Function to parse input into structured rows
  defp parse_input(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&String.split(&1, "", trim: true))
  end

  defp get_size(rows) do
    length(hd(rows))
  end

  defp is_in_map([x, y], size) do
    x >= 0 and x <= size - 1 and y >= 0 and y <= size - 1
  end

  defp parse_rows(rows) do
    rows
    |> List.flatten()
    |> Enum.with_index()
    |> Enum.reduce(%{}, fn {item, index}, acc ->
      cond do
        item == "." -> acc
        Map.has_key?(acc, item) ->
          Map.put(acc, item, Map.get(acc, item) ++ [index])
        true ->
          Map.put(acc, item, [index])
      end
    end)
  end

  defp get_anti_nodes([i1, j1], [i2, j2], size, multiple) do
    diffI = i2 - i1
    diffJ = j2 - j1

    range = if multiple, do: 0..size - 1, else: 1..1
    Enum.reduce(range, MapSet.new(), fn s, acc ->
      n1 = [i1 - diffI * s, j1 - diffJ * s]
      n2 = [i2 + diffI * s, j2 + diffJ * s]

      acc
      |> (fn set -> if is_in_map(n1, size), do: MapSet.put(set, n1), else: set end).()
      |> (fn set -> if is_in_map(n2, size), do: MapSet.put(set, n2), else: set end).()
    end)
  end

  defp process_data(data, size, multiple) do
    Enum.reduce(data, MapSet.new(), fn {_, val}, acc ->
      Enum.reduce(val, acc, fn i, acc_inner ->
        Enum.reduce(val, acc_inner, fn j, acc_inner_inner ->
          cond do
            i >= j -> acc_inner_inner
            true ->
              x1 = trunc(Float.floor(i / size))
              y1 = rem(i, size)
              x2 = trunc(Float.floor(j / size))
              y2 = rem(j, size)

              anti_nodes = get_anti_nodes([x1, y1], [x2, y2], size, multiple)
              MapSet.union(acc_inner_inner, anti_nodes)
          end
        end)
      end)
    end)
  end

  # Public function to solve the problem
  def solution_part1(input) do
    rows = parse_input(input)
    data = parse_rows(rows)
    size = get_size(rows)
    set = process_data(data, size, false)
    MapSet.size(set)
  end

  # Public function to solve the problem
  def solution_part2(input) do
    rows = parse_input(input)
    data = parse_rows(rows)
    size = get_size(rows)
    set = process_data(data, size, true)
    MapSet.size(set)
  end
end

# Read file and call the solution function
{:ok, contents} = File.read("input.txt")
IO.inspect(Solution.solution_part1(contents), charlists: :as_lists)
IO.inspect(Solution.solution_part2(contents), charlists: :as_lists)
