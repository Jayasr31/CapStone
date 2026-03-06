namespace dotnetapp.Exceptions
{
    /// <summary>
    /// Custom exception for party hall related errors
    /// </summary>
    public class PartyHallException : Exception
    {
        public PartyHallException(string message) : base(message)
        {
        }
    }
}
