defmodule Solution do
  # Function to parse input into structured rows
  defp parse_input(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&String.split(&1, ": "))
    |> Enum.map(fn row ->
      Enum.with_index(row)
      |> Enum.map(fn {elem, index} ->
        cond do
          index == 0 -> String.to_integer(elem)
          true -> elem
                  |> String.split()
                  |> Enum.map(&String.to_integer/1)
        end
      end)
    end)
    |> IO.inspect()
  end

  # Function to perform an operation on two numbers
  defp op(a, b, operator) do
    case operator do
      "+" -> a + b
      "*" -> a * b
      _ -> raise "Unsupported operator: #{operator}"
    end
  end

  # Function to validate a test_value against numbers
  defp is_valid(test_value, numbers) do
    cond do
      length(numbers) === 1 and hd(numbers) === test_value -> true

      # Recursive case: Apply each operation and validate
      length(numbers) > 1 ->
        [first, second | tail] = numbers
        Enum.any?(["+","*"], fn operator ->
          is_valid(test_value, [op(first, second, operator) | tail])
        end)

      # Default case: Not valid
      true ->
        false
    end
  end

  # Function to process rows and calculate the result
  defp process_rows(rows) do
    Enum.reduce(rows, 0, fn [test_value, numbers], acc ->
      if is_valid(test_value, numbers) do
        acc + test_value
      else
        acc
      end
    end)
  end

  # Public function to solve the problem
  def solution_part1(input) do
    rows = parse_input(input)
    process_rows(rows)
  end
end

# Read file and call the solution function
{:ok, contents} = File.read("input.txt")
IO.inspect(Solution.solution_part1(contents))
