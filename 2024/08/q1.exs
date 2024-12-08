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

  defp get_anti_nodes([i1, j1], [i2, j2], size) do
    di = abs(i2 - i1)
    dj = abs(j2 - j1)

    isLeft = if i1 < i2, do: -1, else: 1;
    isTop = if j1 < j2, do: -1, else: 1

    n1 = [i1 + di * isLeft, j1 + dj * isTop]
    n2 = [i2 + di * -isLeft, j2 + dj * -isTop]

    n1_in_map = is_in_map(n1, size)
    n2_in_map = is_in_map(n2, size)

    # Add to the set conditionally
    MapSet.new()
    |> (fn set -> if n1_in_map, do: MapSet.put(set, n1), else: set end).()
    |> (fn set -> if n2_in_map, do: MapSet.put(set, n2), else: set end).()
  end

  defp process_data(data, size) do
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

              anti_nodes = get_anti_nodes([x1, y1], [x2, y2], size)
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
    set = process_data(data, size)
    MapSet.size(set)
  end
end

# Read file and call the solution function
{:ok, contents} = File.read("input.txt")
IO.inspect(Solution.solution_part1(contents), charlists: :as_lists)
